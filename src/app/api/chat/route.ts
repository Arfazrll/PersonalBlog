import { NextRequest, NextResponse } from 'next/server';
import { portfolioData } from '@/data/portfolio';

// ─── Build system prompt from portfolio data ─────────────────────────────────
function buildSystemPrompt(locale: string = 'en'): string {
    const { personal, projects, experience, education, skills, achievements, softSkills, tools } = portfolioData as any;

    const projectList = (projects ?? [])
        .map((p: any) =>
            `- ${p.title} (${p.category}): ${p.description}. Tech: ${(p.techStack ?? []).join(', ')}. Role: ${p.role ?? 'Developer'}. ${p.demoUrl && p.demoUrl !== '#' ? `Demo: ${p.demoUrl}` : ''} ${p.repoUrl ? `Repo: ${p.repoUrl}` : ''}`
        )
        .join('\n');

    const expList = (experience ?? [])
        .map((e: any) =>
            `- ${e.role ?? e.position} at ${e.company} (${e.period ?? e.duration}): ${e.description ?? (e.responsibilities ?? []).join('; ')}`
        )
        .join('\n');

    const eduList = (education ?? [])
        .map((e: any) =>
            `- ${e.degree} at ${e.institution} (${e.period ?? e.duration}). ${e.description ?? ''}`
        )
        .join('\n');

    const skillList = (skills ?? [])
        .map((s: any) => `${s.name} (${s.level ?? s.proficiency ?? ''})`)
        .join(', ');

    const softSkillList = (softSkills ?? [])
        .map((s: any) => s.name ?? s)
        .join(', ');

    const toolList = (tools ?? [])
        .map((t: any) => t.name ?? t)
        .join(', ');

    const achievementList = (achievements ?? [])
        .map((a: any) => `- ${a.title}: ${a.description ?? ''}`)
        .join('\n');

    return `You are an AI assistant for ${personal.name}'s portfolio website. You are friendly, helpful, and knowledgeable about ${personal.name}'s background. Answer questions accurately based on the information below.

## Personal Info
- Name: ${personal.name}
- Title: ${personal.title}
- Subtitle: ${personal.subtitle}
- Bio: ${personal.bio}
- Location: ${personal.location}
- Email: ${personal.email}
- Languages: ${(personal.languages ?? []).map((l: any) => `${l.name} (${l.level})`).join(', ')}
- GitHub: ${(personal.socialLinks ?? []).find((s: any) => s.platform === 'GitHub')?.url ?? ''}
- LinkedIn: ${(personal.socialLinks ?? []).find((s: any) => s.platform === 'LinkedIn')?.url ?? ''}

## Projects (${(projects ?? []).length} total)
${projectList}

## Work Experience
${expList || 'See portfolio for details.'}

## Education
${eduList || 'Information Technology, Telkom University.'}

## Technical Skills
${skillList || 'AI, Machine Learning, Full Stack Development, Blockchain.'}

## Soft Skills
${softSkillList || 'Leadership, Communication, Problem Solving.'}

## Tools & Technologies
${toolList || 'VS Code, Docker, GitHub, Figma.'}

## Achievements & Certifications
${achievementList || 'See portfolio for details.'}

## Instructions
- Answer in ${locale === 'id' ? 'Indonesian' : 'English'} (the current interface language). However, if the user asks in a different language, feel free to respond in that language too, while maintaining a professionally friendly tone.
- Be concise but informative. Use bullet points for lists.
- If asked about something not in the portfolio, politely say you only have information about ${personal.name}'s portfolio.
- When recommending projects, include demo links if available.
- Always be positive and professional about ${personal.name}'s work.
- Do NOT make up information not present above.
- Greet users warmly and encourage them to explore the portfolio website.`;
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatRequest {
    messages: Message[];
    locale?: string;
}

// ─── Groq API call ───────────────────────────────────────────────────────────
async function callGroq(messages: Message[], systemPrompt: string): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error('GROQ_API_KEY not configured');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages,
            ],
            max_tokens: 1024,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Groq API error ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty response from Groq');
    return content;
}

// ─── Gemini API call ─────────────────────────────────────────────────────────
async function callGemini(messages: Message[], systemPrompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

    // Convert messages to Gemini format
    const geminiContents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
    }));

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: geminiContents,
                generationConfig: {
                    maxOutputTokens: 1024,
                    temperature: 0.7,
                },
            }),
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error('Empty response from Gemini');
    return content;
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body: ChatRequest = await req.json();

        if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
            return NextResponse.json(
                { error: 'Invalid request: messages array is required.' },
                { status: 400 }
            );
        }

        // Validate each message
        for (const msg of body.messages) {
            if (!msg.role || !msg.content || typeof msg.content !== 'string') {
                return NextResponse.json(
                    { error: 'Invalid message format.' },
                    { status: 400 }
                );
            }
            if (!['user', 'assistant'].includes(msg.role)) {
                return NextResponse.json(
                    { error: 'Invalid message role.' },
                    { status: 400 }
                );
            }
        }

        // Limit to last 20 messages to avoid token overflow
        const messages = body.messages.slice(-20);
        const systemPrompt = buildSystemPrompt(body.locale);

        let reply: string;
        let provider: string;

        // Try Groq first, then fallback to Gemini
        try {
            reply = await callGroq(messages, systemPrompt);
            provider = 'groq';
        } catch (groqError) {
            console.warn('[Chat] Groq failed, falling back to Gemini:', groqError);
            try {
                reply = await callGemini(messages, systemPrompt);
                provider = 'gemini';
            } catch (geminiError) {
                console.error('[Chat] Gemini also failed:', geminiError);
                return NextResponse.json(
                    {
                        error: 'Both AI providers are currently unavailable. Please try again later.',
                        details: {
                            groq: groqError instanceof Error ? groqError.message : String(groqError),
                            gemini: geminiError instanceof Error ? geminiError.message : String(geminiError),
                        },
                    },
                    { status: 503 }
                );
            }
        }

        return NextResponse.json({ reply, provider });
    } catch (error) {
        console.error('[Chat] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}

// ─── GET health check ─────────────────────────────────────────────────────────
export async function GET() {
    const hasGroq = !!process.env.GROQ_API_KEY;
    const hasGemini = !!process.env.GEMINI_API_KEY;
    return NextResponse.json({
        status: 'ok',
        providers: { groq: hasGroq, gemini: hasGemini },
    });
}
