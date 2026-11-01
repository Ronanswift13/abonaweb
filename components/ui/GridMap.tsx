"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SRC = "/images/brand/yunnan-grid.svg";
const MAP_WIDTH = 1600;
const MAP_HEIGHT = 1100;
/** 扫一遍的时长。光带从屏幕左缘开始，前面一段压在文字下面，看起来是一次次间隔扫过 */
const CYCLE_MS = 12000;
/** 光带宽度（占画面宽度的比例）、分条数、最亮处的位置，光晕的缩小倍数 */
const BAND = 0.3;
const STRIPS = 64;
const PEAK = 0.84;
const GLOW_SCALE = 6;

/**
 * 矢量电网图：底层是 SVG，任何屏幕都不失真；上层画布让一条测绘光带横扫地图。
 * OSM 没有潮流方向，光带整片扫过、不沿线路走，不能让人读成电流方向。
 * 规矩和 LoopVideo 相同：进入视口才动，离开就停；系统开启“减少动态效果”时只显示底图。
 */
export function GridMap({ alt, className }: { alt: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const base = imageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !base || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const source = new window.Image();
    let sharp: HTMLCanvasElement | null = null;
    let glow: HTMLCanvasElement | null = null;
    let frame = 0;
    let visible = false;

    /** 按当前尺寸把 SVG 画到离屏画布，取景和底层 <img> 的 object-fit: cover 一致 */
    function rasterize() {
      if (!canvas || !base || !source.complete || !source.naturalWidth) return;
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(box.width * ratio);
      const height = Math.round(box.height * ratio);
      if (!width || !height) return;
      canvas.width = width;
      canvas.height = height;

      const [posX, posY] = getComputedStyle(base).objectPosition.split(" ").map((v) => parseFloat(v) / 100);
      const scale = Math.max(width / MAP_WIDTH, height / MAP_HEIGHT);
      const drawWidth = MAP_WIDTH * scale;
      const drawHeight = MAP_HEIGHT * scale;

      sharp = document.createElement("canvas");
      sharp.width = width;
      sharp.height = height;
      sharp
        .getContext("2d")
        ?.drawImage(source, (width - drawWidth) * posX, (height - drawHeight) * posY, drawWidth, drawHeight);

      glow = document.createElement("canvas");
      glow.width = Math.ceil(width / GLOW_SCALE);
      glow.height = Math.ceil(height / GLOW_SCALE);
      glow.getContext("2d")?.drawImage(sharp, 0, 0, glow.width, glow.height);
    }

    function draw(time: number) {
      frame = requestAnimationFrame(draw);
      if (!canvas || !ctx || !sharp || !glow) return;
      const { width, height } = canvas;
      const band = Math.round(width * BAND);
      const strip = Math.ceil(band / STRIPS);
      const head = ((time % CYCLE_MS) / CYCLE_MS) * (width + band);

      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < STRIPS; i++) {
        const left = Math.round(head - band + i * strip);
        const x = Math.max(left, 0);
        const w = Math.min(left + strip, width) - x;
        if (w <= 0) continue;
        // 前缘短促淡入，身后慢慢退回底图
        const position = (i + 1) / STRIPS;
        const alpha = position < PEAK ? (position / PEAK) ** 2 : (1 - position) / (1 - PEAK);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = alpha;
        ctx.drawImage(sharp, x, 0, w, height, x, 0, w, height);
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = alpha * 0.55;
        ctx.drawImage(glow, x / GLOW_SCALE, 0, w / GLOW_SCALE, glow.height, x, 0, w, height);
      }
    }

    function sync() {
      cancelAnimationFrame(frame);
      if (visible && sharp) frame = requestAnimationFrame(draw);
    }

    source.onload = () => {
      rasterize();
      sync();
    };
    // #lines 去掉州市名：名字留在底图上，光带只提亮线路
    source.src = `${SRC}#lines`;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    io.observe(canvas);

    const resize = new ResizeObserver(() => {
      rasterize();
      sync();
    });
    resize.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      resize.disconnect();
    };
  }, []);

  return (
    <>
      <Image ref={imageRef} src={SRC} fill unoptimized sizes="100vw" alt={alt} className={className} />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full mix-blend-screen" />
    </>
  );
}
