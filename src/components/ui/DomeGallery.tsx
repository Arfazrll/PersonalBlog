'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface ImageItem {
    src: string;
    alt?: string;
}

interface DomeGalleryProps {
    images?: (string | ImageItem)[];
    fit?: number;
    fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
    minRadius?: number;
    maxRadius?: number;
    padFactor?: number;
    overlayBlurColor?: string;
    maxVerticalRotationDeg?: number;
    dragSensitivity?: number;
    enlargeTransitionMs?: number;
    segments?: number;
    dragDampening?: number;
    openedImageWidth?: string;
    openedImageHeight?: string;
    imageBorderRadius?: string;
    openedImageBorderRadius?: string;
    grayscale?: boolean;
}

const DEFAULT_IMAGES: ImageItem[] = [
    { src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop', alt: 'Abstract art' },
    { src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop', alt: 'Modern sculpture' },
    { src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop', alt: 'Digital artwork' }
];

const AUTO_ROTATE_SPEED_DEG_PER_MS = 0.008;

export const DomeGallery: React.FC<DomeGalleryProps> = ({
    images,
    fit = 0.5,
    fitBasis = 'auto',
    minRadius = 600,
    maxRadius = Infinity,
    padFactor = 0.25,
    overlayBlurColor = '#060010',
    maxVerticalRotationDeg = 5,
    dragSensitivity = 20,
    enlargeTransitionMs = 300,
    segments = 35,
    dragDampening = 2,
    openedImageWidth = '400px',
    openedImageHeight = '400px',
    imageBorderRadius = '30px',
    openedImageBorderRadius = '30px',
    grayscale = true
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<HTMLDivElement>(null);
    const scrimRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);

    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [startRotation, setStartRotation] = useState({ x: 0, y: 0 });
    const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
    const [originalTilePosition, setOriginalTilePosition] = useState<DOMRect | null>(null);

    const inertiaAnimationFrameRef = useRef<number | null>(null);
    const autoRotateAnimationFrameRef = useRef<number | null>(null);
    const lastAutoRotateTimeRef = useRef(0);
    const openStartedAtRef = useRef(0);
    const lastDragEndAtRef = useRef(0);

    const imagesSource = useMemo(() => images || DEFAULT_IMAGES, [images]);

    // Utility functions
    const clamp = useCallback((v: number, min: number, max: number): number =>
        Math.min(Math.max(v, min), max), []);

    const normalizeAngle = useCallback((d: number): number =>
        ((d % 360) + 360) % 360, []);

    const wrapAngleSigned = useCallback((deg: number): number => {
        const a = (((deg + 180) % 360) + 360) % 360;
        return a - 180;
    }, []);

    const getDataNumber = (el: HTMLElement, name: string, fallback: number): number => {
        const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
        const n = attr == null ? NaN : parseFloat(attr);
        return Number.isFinite(n) ? n : fallback;
    };

    // Build items
    const items = useMemo(() => {
        const buildItems = (pool: (string | ImageItem)[], seg: number) => {
            const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
            const evenYs = [-4, -2, 0, 2, 4];
            const oddYs = [-3, -1, 1, 3, 5];

            const coords = xCols.flatMap((x, c) => {
                const ys = c % 2 === 0 ? evenYs : oddYs;
                return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
            });

            // Safeguard against empty pool
            const effectivePool = (pool && pool.length > 0) ? pool : DEFAULT_IMAGES;

            const normalizedImages = effectivePool.map(image =>
                typeof image === 'string' ? { src: image, alt: '' } : { src: image.src || '', alt: image.alt || '' }
            );

            const totalSlots = coords.length;
            const usedImages = Array.from({ length: totalSlots }, (_, i) =>
                normalizedImages[i % normalizedImages.length]
            );

            // Shuffle to avoid adjacent duplicates - with safety checks
            for (let i = 1; i < usedImages.length; i++) {
                if (usedImages[i] && usedImages[i - 1] && usedImages[i].src === usedImages[i - 1].src) {
                    for (let j = i + 1; j < usedImages.length; j++) {
                        if (usedImages[j] && usedImages[j].src !== usedImages[i].src) {
                            const tmp = usedImages[i];
                            usedImages[i] = usedImages[j];
                            usedImages[j] = tmp;
                            break;
                        }
                    }
                }
            }

            return coords.map((c, i) => ({
                ...c,
                src: (usedImages[i] && usedImages[i].src) || '',
                alt: (usedImages[i] && usedImages[i].alt) || ''
            }));
        };

        return buildItems(imagesSource, segments);
    }, [imagesSource, segments]);

    // Apply transform
    const applyTransform = useCallback((xDeg: number, yDeg: number) => {
        if (sphereRef.current) {
            sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
        }
    }, []);

    // Inertia
    const stopInertia = useCallback(() => {
        if (inertiaAnimationFrameRef.current) {
            cancelAnimationFrame(inertiaAnimationFrameRef.current);
            inertiaAnimationFrameRef.current = null;
        }
    }, []);

    const startInertia = useCallback((vx: number, vy: number) => {
        const MAX_V = 1.4;
        let vX = clamp(vx, -MAX_V, MAX_V) * 80;
        let vY = clamp(vy, -MAX_V, MAX_V) * 80;
        let frames = 0;
        const d = clamp(dragDampening ?? 0.6, 0, 1);
        const frictionMul = 0.94 + 0.055 * d;
        const stopThreshold = 0.015 - 0.01 * d;
        const maxFrames = Math.round(90 + 270 * d);

        const step = () => {
            vX *= frictionMul;
            vY *= frictionMul;
            if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
                inertiaAnimationFrameRef.current = null;
                return;
            }
            if (++frames > maxFrames) {
                inertiaAnimationFrameRef.current = null;
                return;
            }

            setRotation(prev => {
                const nextX = clamp(prev.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
                const nextY = wrapAngleSigned(prev.y + vX / 200);
                applyTransform(nextX, nextY);
                return { x: nextX, y: nextY };
            });

            inertiaAnimationFrameRef.current = requestAnimationFrame(step);
        };

        stopInertia();
        inertiaAnimationFrameRef.current = requestAnimationFrame(step);
    }, [clamp, dragDampening, maxVerticalRotationDeg, wrapAngleSigned, applyTransform, stopInertia]);

    // Auto-rotation
    const stopAutoRotate = useCallback(() => {
        if (autoRotateAnimationFrameRef.current) {
            cancelAnimationFrame(autoRotateAnimationFrameRef.current);
            autoRotateAnimationFrameRef.current = null;
        }
        lastAutoRotateTimeRef.current = 0;
    }, []);

    const startAutoRotate = useCallback(() => {
        if (autoRotateAnimationFrameRef.current !== null) return;

        const autoRotateStep = (now: number) => {
            if (!lastAutoRotateTimeRef.current) {
                lastAutoRotateTimeRef.current = now;
            }
            const deltaMs = now - lastAutoRotateTimeRef.current;
            lastAutoRotateTimeRef.current = now;

            const canSpin = !isDragging && !isOpening && !focusedElement && inertiaAnimationFrameRef.current === null;

            if (canSpin && deltaMs > 0) {
                setRotation(prev => {
                    const nextY = wrapAngleSigned(prev.y + deltaMs * AUTO_ROTATE_SPEED_DEG_PER_MS);
                    if (nextY !== prev.y) {
                        applyTransform(prev.x, nextY);
                        return { x: prev.x, y: nextY };
                    }
                    return prev;
                });
            }

            autoRotateAnimationFrameRef.current = requestAnimationFrame(autoRotateStep);
        };

        lastAutoRotateTimeRef.current = 0;
        autoRotateAnimationFrameRef.current = requestAnimationFrame(autoRotateStep);
    }, [isDragging, isOpening, focusedElement, wrapAngleSigned, applyTransform]);

    // Drag handlers
    const onDragStart = useCallback((e: MouseEvent | TouchEvent) => {
        if (focusedElement) return;
        stopInertia();

        setIsDragging(true);
        setHasMoved(false);
        setStartRotation(rotation);

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setStartPosition({ x: clientX, y: clientY });
    }, [focusedElement, rotation, stopInertia]);

    const onDragMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (focusedElement || !isDragging || !startPosition) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const dxTotal = clientX - startPosition.x;
        const dyTotal = clientY - startPosition.y;

        if (!hasMoved) {
            const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
            if (dist2 > 16) setHasMoved(true);
        }

        const nextX = clamp(
            startRotation.x - dyTotal / dragSensitivity,
            -maxVerticalRotationDeg,
            maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(startRotation.y + dxTotal / dragSensitivity);

        setRotation(prev => {
            if (prev.x !== nextX || prev.y !== nextY) {
                applyTransform(nextX, nextY);
                return { x: nextX, y: nextY };
            }
            return prev;
        });
    }, [focusedElement, isDragging, startPosition, hasMoved, startRotation, dragSensitivity, maxVerticalRotationDeg, clamp, wrapAngleSigned, applyTransform]);

    const onDragEnd = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;

        setIsDragging(false);

        if (hasMoved && startPosition) {
            const clientX = 'touches' in e ? (e.changedTouches?.[0]?.clientX ?? 0) : e.clientX;
            const clientY = 'touches' in e ? (e.changedTouches?.[0]?.clientY ?? 0) : e.clientY;

            const dxTotal = clientX - startPosition.x;
            const dyTotal = clientY - startPosition.y;

            const vx = clamp((dxTotal / dragSensitivity) * 0.02, -1.2, 1.2);
            const vy = clamp((dyTotal / dragSensitivity) * 0.02, -1.2, 1.2);

            if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) {
                startInertia(vx, vy);
            }

            lastDragEndAtRef.current = performance.now();
        }

        setHasMoved(false);
    }, [isDragging, hasMoved, startPosition, dragSensitivity, clamp, startInertia]);

    // Image enlargement
    const openItemFromElement = useCallback((el: HTMLElement) => {
        if (isOpening) return;
        setIsOpening(true);
        openStartedAtRef.current = performance.now();

        if (rootRef.current) {
            document.body.classList.add('overflow-hidden');
        }

        const parent = el.parentElement;
        if (!parent) return;

        setFocusedElement(el);
        el.setAttribute('data-focused', 'true');

        const offsetX = getDataNumber(parent, 'offsetX', 0);
        const offsetY = getDataNumber(parent, 'offsetY', 0);
        const sizeX = getDataNumber(parent, 'sizeX', 2);
        const sizeY = getDataNumber(parent, 'sizeY', 2);

        const computeItemBaseRotation = (ox: number, oy: number, sx: number, sy: number, seg: number) => {
            const unit = 360 / seg / 2;
            return {
                rotateY: unit * (ox + (sx - 1) / 2),
                rotateX: unit * (oy - (sy - 1) / 2)
            };
        };

        const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
        const parentY = normalizeAngle(parentRot.rotateY);
        const globalY = normalizeAngle(rotation.y);
        let rotY = -(parentY + globalY) % 360;
        if (rotY < -180) rotY += 360;
        const rotX = -parentRot.rotateX - rotation.x;

        parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
        parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

        const refDiv = document.createElement('div');
        refDiv.className = 'item__image item__image--reference';
        refDiv.style.opacity = '0';
        refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
        parent.appendChild(refDiv);

        const tileR = refDiv.getBoundingClientRect();
        const mainR = mainRef.current?.getBoundingClientRect();
        const frameR = frameRef.current?.getBoundingClientRect();

        if (!mainR || !frameR) return;

        setOriginalTilePosition({
            left: tileR.left,
            top: tileR.top,
            width: tileR.width,
            height: tileR.height
        } as DOMRect);

        el.style.visibility = 'hidden';
        el.style.zIndex = '0';

        const overlay = document.createElement('div');
        overlay.className = 'enlarge';
        Object.assign(overlay.style, {
            position: 'absolute',
            left: `${frameR.left - mainR.left}px`,
            top: `${frameR.top - mainR.top}px`,
            width: `${frameR.width}px`,
            height: `${frameR.height}px`,
            opacity: '0',
            zIndex: '30',
            willChange: 'transform, opacity',
            transformOrigin: 'top left',
            transition: `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`,
            borderRadius: openedImageBorderRadius
        });

        const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
        const img = document.createElement('img');
        img.src = rawSrc;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        overlay.appendChild(img);
        viewerRef.current?.appendChild(overlay);

        const tx0 = tileR.left - frameR.left;
        const ty0 = tileR.top - frameR.top;
        const sx0 = tileR.width / frameR.width;
        const sy0 = tileR.height / frameR.height;
        overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`;

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translate(0px, 0px) scale(1,1)';
            rootRef.current?.setAttribute('data-enlarging', 'true');
            scrimRef.current?.classList.add('opacity-100', 'pointer-events-auto');
            scrimRef.current?.classList.remove('opacity-0', 'pointer-events-none');
        });

        const wantsResize = openedImageWidth || openedImageHeight;
        if (wantsResize) {
            const onFirstEnd = (ev: TransitionEvent) => {
                if (ev.propertyName !== 'transform') return;
                overlay.removeEventListener('transitionend', onFirstEnd);
                const prevTransition = overlay.style.transition;
                overlay.style.transition = 'none';
                const tempWidth = openedImageWidth || `${frameR.width}px`;
                const tempHeight = openedImageHeight || `${frameR.height}px`;
                overlay.style.width = tempWidth;
                overlay.style.height = tempHeight;
                const newRect = overlay.getBoundingClientRect();
                overlay.style.width = `${frameR.width}px`;
                overlay.style.height = `${frameR.height}px`;
                void overlay.offsetWidth;
                overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
                const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
                const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
                requestAnimationFrame(() => {
                    overlay.style.left = `${centeredLeft}px`;
                    overlay.style.top = `${centeredTop}px`;
                    overlay.style.width = tempWidth;
                    overlay.style.height = tempHeight;
                });
                const cleanupSecond = () => {
                    overlay.removeEventListener('transitionend', cleanupSecond);
                    overlay.style.transition = prevTransition;
                };
                overlay.addEventListener('transitionend', cleanupSecond, { once: true });
            };
            overlay.addEventListener('transitionend', onFirstEnd);
        }
    }, [isOpening, segments, rotation, normalizeAngle, enlargeTransitionMs, openedImageBorderRadius, openedImageWidth, openedImageHeight]);

    const closeEnlargedImage = useCallback(() => {
        if (performance.now() - openStartedAtRef.current < 250) return;
        const el = focusedElement;
        if (!el) return;
        const parent = el.parentElement;
        const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement;
        if (!overlay || !parent) return;
        const refDiv = parent.querySelector('.item__image--reference');
        const originalPos = originalTilePosition;

        if (!originalPos) {
            overlay.remove();
            if (refDiv) refDiv.remove();
            parent.style.setProperty('--rot-y-delta', '0deg');
            parent.style.setProperty('--rot-x-delta', '0deg');
            el.style.visibility = '';
            el.style.zIndex = '0';
            setFocusedElement(null);
            rootRef.current?.removeAttribute('data-enlarging');
            scrimRef.current?.classList.add('opacity-0', 'pointer-events-none');
            scrimRef.current?.classList.remove('opacity-100', 'pointer-events-auto');
            setIsOpening(false);
            document.body.classList.remove('overflow-hidden');
            return;
        }

        const currentRect = overlay.getBoundingClientRect();
        const rootRect = rootRef.current?.getBoundingClientRect();
        if (!rootRect) return;

        const originalPosRelativeToRoot = {
            left: originalPos.left - rootRect.left,
            top: originalPos.top - rootRect.top,
            width: originalPos.width,
            height: originalPos.height
        };

        const overlayRelativeToRoot = {
            left: currentRect.left - rootRect.left,
            top: currentRect.top - rootRect.top,
            width: currentRect.width,
            height: currentRect.height
        };

        const animatingOverlay = document.createElement('div');
        animatingOverlay.className = 'enlarge-closing';
        animatingOverlay.style.cssText = `position:absolute;left:${overlayRelativeToRoot.left}px;top:${overlayRelativeToRoot.top}px;width:${overlayRelativeToRoot.width}px;height:${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;

        const originalImg = overlay.querySelector('img');
        if (originalImg) {
            const img = originalImg.cloneNode() as HTMLImageElement;
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
            animatingOverlay.appendChild(img);
        }

        overlay.remove();
        rootRef.current?.appendChild(animatingOverlay);
        void animatingOverlay.getBoundingClientRect();

        requestAnimationFrame(() => {
            animatingOverlay.style.left = `${originalPosRelativeToRoot.left}px`;
            animatingOverlay.style.top = `${originalPosRelativeToRoot.top}px`;
            animatingOverlay.style.width = `${originalPosRelativeToRoot.width}px`;
            animatingOverlay.style.height = `${originalPosRelativeToRoot.height}px`;
            animatingOverlay.style.opacity = '0';
        });

        const cleanup = () => {
            animatingOverlay.remove();
            setOriginalTilePosition(null);
            if (refDiv) refDiv.remove();
            parent.style.transition = 'none';
            el.style.transition = 'none';
            parent.style.setProperty('--rot-y-delta', '0deg');
            parent.style.setProperty('--rot-x-delta', '0deg');
            requestAnimationFrame(() => {
                el.style.visibility = '';
                el.style.opacity = '0';
                el.style.zIndex = '0';
                setFocusedElement(null);
                rootRef.current?.removeAttribute('data-enlarging');
                scrimRef.current?.classList.add('opacity-0', 'pointer-events-none');
                scrimRef.current?.classList.remove('opacity-100', 'pointer-events-auto');
                requestAnimationFrame(() => {
                    parent.style.transition = '';
                    el.style.transition = 'opacity 300ms ease-out';
                    requestAnimationFrame(() => {
                        el.style.opacity = '1';
                        setTimeout(() => {
                            el.style.transition = '';
                            el.style.opacity = '';
                            setIsOpening(false);
                            document.body.classList.remove('overflow-hidden');
                        }, 300);
                    });
                });
            });
        };

        animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
    }, [focusedElement, originalTilePosition, enlargeTransitionMs]);

    // Tile event handlers
    const onTileClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) return;
        if (performance.now() - lastDragEndAtRef.current < 80) return;
        if (isOpening) return;
        openItemFromElement(e.currentTarget);
    }, [isDragging, isOpening, openItemFromElement]);

    const onTilePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'touch') return;
        if (isDragging) return;
        if (performance.now() - lastDragEndAtRef.current < 80) return;
        if (isOpening) return;
        openItemFromElement(e.currentTarget);
    }, [isDragging, isOpening, openItemFromElement]);

    const onTileTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        if (isDragging) return;
        if (performance.now() - lastDragEndAtRef.current < 80) return;
        if (isOpening) return;
        openItemFromElement(e.currentTarget);
    }, [isDragging, isOpening, openItemFromElement]);

    // Setup and cleanup
    useEffect(() => {
        applyTransform(rotation.x, rotation.y);
        startAutoRotate();

        const root = rootRef.current;
        const main = mainRef.current;
        if (!root || !main) return;

        const resizeObserver = new ResizeObserver(entries => {
            const cr = entries[0].contentRect;
            const w = Math.max(1, cr.width);
            const h = Math.max(1, cr.height);
            const minDim = Math.min(w, h);
            const maxDim = Math.max(w, h);
            const aspect = w / h;

            let basis: number;
            switch (fitBasis) {
                case 'min': basis = minDim; break;
                case 'max': basis = maxDim; break;
                case 'width': basis = w; break;
                case 'height': basis = h; break;
                default: basis = aspect >= 1.3 ? w : minDim;
            }

            let radius = basis * fit;
            const heightGuard = h * 1.35;
            radius = Math.min(radius, heightGuard);
            radius = clamp(radius, minRadius, maxRadius);

            const viewerPad = Math.max(8, Math.round(minDim * padFactor));
            const roundedRadius = Math.round(radius);

            root.style.setProperty('--radius', `${roundedRadius}px`);
            root.style.setProperty('--viewer-pad', `${viewerPad}px`);
        });

        resizeObserver.observe(root);

        const handleMouseDown = (e: MouseEvent) => onDragStart(e);
        const handleTouchStart = (e: TouchEvent) => onDragStart(e);
        const handleMouseMove = (e: MouseEvent) => onDragMove(e);
        const handleTouchMove = (e: TouchEvent) => onDragMove(e);
        const handleMouseUp = (e: MouseEvent) => onDragEnd(e);
        const handleTouchEnd = (e: TouchEvent) => onDragEnd(e);
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeEnlargedImage();
        };

        main.addEventListener('mousedown', handleMouseDown, { passive: true });
        main.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('keydown', handleKeyDown);

        const scrim = scrimRef.current;
        if (scrim) {
            scrim.addEventListener('click', closeEnlargedImage);
        }

        return () => {
            stopInertia();
            stopAutoRotate();
            resizeObserver.disconnect();
            main.removeEventListener('mousedown', handleMouseDown);
            main.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
            if (scrim) {
                scrim.removeEventListener('click', closeEnlargedImage);
            }
            document.body.classList.remove('overflow-hidden');
        };
    }, [rotation, fitBasis, fit, minRadius, maxRadius, padFactor, clamp, applyTransform, startAutoRotate, stopInertia, stopAutoRotate, onDragStart, onDragMove, onDragEnd, closeEnlargedImage]);

    const cssVars = {
        '--segments-x': segments,
        '--segments-y': segments,
        '--overlay-blur-color': overlayBlurColor,
        '--tile-radius': imageBorderRadius,
        '--enlarge-radius': openedImageBorderRadius,
        '--image-filter': grayscale ? 'grayscale(1)' : 'none',
        '--radius': '520px',
        '--viewer-pad': '72px',
        '--circ': 'calc(var(--radius) * 3.14)',
        '--rot-y': 'calc((360deg / var(--segments-x)) / 2)',
        '--rot-x': 'calc((360deg / var(--segments-y)) / 2)',
        '--item-width': 'calc(var(--circ) / var(--segments-x))',
        '--item-height': 'calc(var(--circ) / var(--segments-y))'
    } as React.CSSProperties;

    return (
        <div
            ref={rootRef}
            className="relative w-full h-full box-border"
            style={cssVars}
        >
            <main
                ref={mainRef}
                className="absolute inset-0 grid place-items-center overflow-hidden touch-none select-none bg-transparent"
            >
                <div
                    className="w-full h-full grid place-items-center"
                    style={{
                        perspective: 'calc(var(--radius) * 2)',
                        perspectiveOrigin: '50% 50%',
                        contain: 'layout paint size'
                    }}
                >
                    <div
                        ref={sphereRef}
                        className="will-change-transform"
                        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(calc(var(--radius) * -1))' }}
                    >
                        {items.map((item, i) => (
                            <div
                                key={`${item.x},${item.y},${i}`}
                                className="absolute -top-[999px] -bottom-[999px] -left-[999px] -right-[999px] m-auto transition-transform duration-300"
                                data-src={item.src}
                                data-offset-x={item.x}
                                data-offset-y={item.y}
                                data-size-x={item.sizeX}
                                data-size-y={item.sizeY}
                                style={{
                                    '--offset-x': item.x,
                                    '--offset-y': item.y,
                                    '--item-size-x': item.sizeX,
                                    '--item-size-y': item.sizeY,
                                    width: 'calc(var(--item-width) * var(--item-size-x))',
                                    height: 'calc(var(--item-height) * var(--item-size-y))',
                                    transformStyle: 'preserve-3d',
                                    transformOrigin: '50% 50%',
                                    backfaceVisibility: 'hidden',
                                    transform: `rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) translateZ(var(--radius))`
                                } as React.CSSProperties}
                            >
                                <div
                                    className="absolute block inset-[10px] bg-transparent overflow-hidden transition-transform duration-300 cursor-pointer pointer-events-auto transform translate-z-0 focus:outline-none"
                                    role="button"
                                    tabIndex={0}
                                    aria-label={item.alt || 'Open image'}
                                    onClick={onTileClick}
                                    onPointerUp={onTilePointerUp}
                                    onTouchEnd={onTileTouchEnd}
                                    style={{
                                        borderRadius: 'var(--tile-radius, 12px)',
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden',
                                        touchAction: 'manipulation',
                                        WebkitTapHighlightColor: 'transparent',
                                        WebkitTransform: 'translateZ(0)'
                                    }}
                                >
                                    <img
                                        src={item.src}
                                        draggable={false}
                                        alt={item.alt}
                                        className="w-full h-full object-cover pointer-events-none"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            filter: 'var(--image-filter, none)'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Minimal Top/Bottom fade only */}
                <div
                    className="absolute left-0 right-0 h-[80px] z-[5] pointer-events-none top-0 rotate-180"
                    style={{ background: 'linear-gradient(to bottom, transparent, var(--overlay-blur-color, hsl(var(--background))) 90%)' }}
                />
                <div
                    className="absolute left-0 right-0 h-[80px] z-[5] pointer-events-none bottom-0"
                    style={{ background: 'linear-gradient(to bottom, transparent, var(--overlay-blur-color, hsl(var(--background))) 90%)' }}
                />


                {/* Viewer */}
                <div
                    ref={viewerRef}
                    className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                    style={{ padding: 'var(--viewer-pad)' }}
                >
                    <div
                        ref={scrimRef}
                        className="absolute inset-0 z-10 bg-black/40 pointer-events-none opacity-0 transition-opacity duration-500 ease-linear"
                        style={{ backdropFilter: 'blur(3px)' }}
                    />
                    <div
                        ref={frameRef}
                        className="h-full aspect-square flex max-[1/1]:h-auto max-[1/1]:w-full"
                        style={{ borderRadius: 'var(--enlarge-radius, 32px)' }}
                    />
                </div>
            </main>
        </div>
    );
};
