import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  RotateCcw,
  Trophy,
  Volume2,
  VolumeX,
  Sparkles,
  Gamepad2,
  Shield,
  Zap,
  Bomb
} from 'lucide-react';

interface NetflixArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simple Web Audio API sound synthesizer
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playLaser() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playExplosion() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playPowerup() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playGameOver() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }
}

const sounds = new SoundFX();

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface Enemy {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hp: number;
  maxHp: number;
  type: 'glitch' | 'bug' | 'trojan';
  color: string;
  points: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  radius: number;
}

interface PowerUp {
  x: number;
  y: number;
  vy: number;
  type: 'rapid' | 'shield' | 'bomb';
  color: string;
}

export const NetflixArcadeModal: React.FC<NetflixArcadeModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('cyberblast_highscore') || '0', 10);
  });
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasShield, setHasShield] = useState(false);
  const [rapidFireTimer, setRapidFireTimer] = useState(0);

  // References for live loop state
  const stateRef = useRef({
    gameState: 'menu' as 'menu' | 'playing' | 'gameover',
    playerX: 200,
    playerY: 480,
    playerWidth: 36,
    playerHeight: 28,
    score: 0,
    lives: 3,
    wave: 1,
    hasShield: false,
    rapidFire: 0,
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    powerups: [] as PowerUp[],
    keys: {} as Record<string, boolean>,
    lastShotTime: 0,
    lastSpawnTime: 0
  });

  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle Keyboard bindings
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      stateRef.current.keys[e.code] = true;
      if (e.code === 'Escape') {
        onClose();
      }
      if (e.code === 'Space' && stateRef.current.gameState !== 'playing') {
        e.preventDefault();
        startGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      stateRef.current.keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen]);

  const startGame = () => {
    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 500;
    const h = canvas ? canvas.height : 550;

    stateRef.current = {
      gameState: 'playing',
      playerX: w / 2,
      playerY: h - 50,
      playerWidth: 36,
      playerHeight: 28,
      score: 0,
      lives: 3,
      wave: 1,
      hasShield: false,
      rapidFire: 0,
      bullets: [],
      enemies: [],
      particles: [],
      powerups: [],
      keys: {},
      lastShotTime: 0,
      lastSpawnTime: performance.now()
    };

    setScore(0);
    setLives(3);
    setWave(1);
    setHasShield(false);
    setRapidFireTimer(0);
    setGameState('playing');
  };

  // Main Canvas Game Loop
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 520);
    const height = (canvas.height = 560);

    const spawnEnemy = (currWave: number) => {
      const types: ('glitch' | 'bug' | 'trojan')[] = ['glitch', 'glitch', 'bug'];
      if (currWave > 2) types.push('trojan');
      const chosenType = types[Math.floor(Math.random() * types.length)];

      let color = '#38BDF8';
      let hp = 1;
      let radius = 14;
      let vy = Math.random() * 1.5 + 1.2 + currWave * 0.2;
      let points = 50;

      if (chosenType === 'bug') {
        color = '#10B981';
        hp = 2;
        radius = 18;
        vy = Math.random() * 1.2 + 1.0 + currWave * 0.15;
        points = 100;
      } else if (chosenType === 'trojan') {
        color = '#E50914';
        hp = 4;
        radius = 24;
        vy = Math.random() * 0.8 + 0.6 + currWave * 0.1;
        points = 250;
      }

      stateRef.current.enemies.push({
        x: Math.random() * (width - 60) + 30,
        y: -30,
        vx: (Math.random() - 0.5) * 1.2,
        vy,
        radius,
        hp,
        maxHp: hp,
        type: chosenType,
        color,
        points
      });
    };

    const addExplosion = (x: number, y: number, color: string, count = 15) => {
      sounds.playExplosion();
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        stateRef.current.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          radius: Math.random() * 2.5 + 1
        });
      }
    };

    // Canvas Touch / Mouse drag support
    const handleCanvasMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const mouseX = ((clientX - rect.left) / rect.width) * width;
      stateRef.current.playerX = Math.max(25, Math.min(width - 25, mouseX));
    };

    canvas.addEventListener('mousemove', handleCanvasMove);
    canvas.addEventListener('touchmove', handleCanvasMove, { passive: true });

    const render = () => {
      animId = requestAnimationFrame(render);
      const st = stateRef.current;

      // Background Clear with starfield
      ctx.fillStyle = '#090A0F';
      ctx.fillRect(0, 0, width, height);

      // Cyber Grid Background Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (st.gameState === 'playing') {
        const now = performance.now();

        // 1. Keyboard Movement
        const speed = 6.5;
        if (st.keys['ArrowLeft'] || st.keys['KeyA']) {
          st.playerX = Math.max(25, st.playerX - speed);
        }
        if (st.keys['ArrowRight'] || st.keys['KeyD']) {
          st.playerX = Math.min(width - 25, st.playerX + speed);
        }

        // 2. Firing Bullets
        const fireInterval = st.rapidFire > 0 ? 110 : 220;
        if (now - st.lastShotTime > fireInterval) {
          st.lastShotTime = now;
          sounds.playLaser();

          if (st.rapidFire > 0) {
            // Dual laser cannon
            st.bullets.push(
              { x: st.playerX - 10, y: st.playerY - 12, vx: -0.4, vy: -9, color: '#E50914' },
              { x: st.playerX + 10, y: st.playerY - 12, vx: 0.4, vy: -9, color: '#E50914' }
            );
            st.rapidFire--;
            setRapidFireTimer(st.rapidFire);
          } else {
            st.bullets.push({
              x: st.playerX,
              y: st.playerY - 15,
              vx: 0,
              vy: -8.5,
              color: '#38BDF8'
            });
          }
        }

        // 3. Enemy Spawning
        const spawnDelay = Math.max(700, 1600 - st.wave * 120);
        if (now - st.lastSpawnTime > spawnDelay) {
          st.lastSpawnTime = now;
          spawnEnemy(st.wave);
        }

        // 4. Update & Draw Bullets
        for (let b = st.bullets.length - 1; b >= 0; b--) {
          const bullet = st.bullets[b];
          bullet.x += bullet.vx;
          bullet.y += bullet.vy;

          // Draw laser bolt
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = bullet.color;
          ctx.shadowColor = bullet.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          if (bullet.y < -10) {
            st.bullets.splice(b, 1);
          }
        }

        // 5. Update & Draw Enemies & Collision
        for (let e = st.enemies.length - 1; e >= 0; e--) {
          const enemy = st.enemies[e];
          enemy.x += enemy.vx;
          enemy.y += enemy.vy;

          // Bounce off side walls
          if (enemy.x - enemy.radius < 0 || enemy.x + enemy.radius > width) {
            enemy.vx *= -1;
          }

          // Draw Enemy Node
          ctx.beginPath();
          ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
          ctx.fillStyle = enemy.color;
          ctx.shadowColor = enemy.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Enemy inner core
          ctx.beginPath();
          ctx.arc(enemy.x, enemy.y, enemy.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Health bar for tank enemies
          if (enemy.maxHp > 1) {
            const barW = enemy.radius * 2;
            const barH = 3;
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(enemy.x - enemy.radius, enemy.y - enemy.radius - 8, barW, barH);
            ctx.fillStyle = '#22C55E';
            ctx.fillRect(
              enemy.x - enemy.radius,
              enemy.y - enemy.radius - 8,
              (barW * enemy.hp) / enemy.maxHp,
              barH
            );
          }

          // Bullet vs Enemy Collision
          for (let b = st.bullets.length - 1; b >= 0; b--) {
            const bullet = st.bullets[b];
            const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);

            if (dist < enemy.radius + 5) {
              st.bullets.splice(b, 1);
              enemy.hp--;

              // Spark hit
              for (let k = 0; k < 4; k++) {
                st.particles.push({
                  x: bullet.x,
                  y: bullet.y,
                  vx: (Math.random() - 0.5) * 3,
                  vy: (Math.random() - 0.5) * 3,
                  color: '#FFFFFF',
                  alpha: 0.9,
                  decay: 0.05,
                  radius: 1.5
                });
              }

              if (enemy.hp <= 0) {
                addExplosion(enemy.x, enemy.y, enemy.color, 18);
                st.score += enemy.points;
                setScore(st.score);

                // Wave progression every 500 points
                if (Math.floor(st.score / 600) + 1 > st.wave) {
                  st.wave = Math.floor(st.score / 600) + 1;
                  setWave(st.wave);
                  sounds.playPowerup();
                }

                // Chance to drop power-up (15%)
                if (Math.random() < 0.18) {
                  const types: ('rapid' | 'shield' | 'bomb')[] = ['rapid', 'shield', 'bomb'];
                  const pType = types[Math.floor(Math.random() * types.length)];
                  const pColor = pType === 'rapid' ? '#E50914' : pType === 'shield' ? '#38BDF8' : '#F59E0B';
                  st.powerups.push({
                    x: enemy.x,
                    y: enemy.y,
                    vy: 1.8,
                    type: pType,
                    color: pColor
                  });
                }

                st.enemies.splice(e, 1);
                break;
              }
            }
          }

          // Player vs Enemy Collision
          const playerDist = Math.hypot(st.playerX - enemy.x, st.playerY - enemy.y);
          if (playerDist < enemy.radius + 18) {
            addExplosion(enemy.x, enemy.y, enemy.color, 25);
            st.enemies.splice(e, 1);

            if (st.hasShield) {
              st.hasShield = false;
              setHasShield(false);
              sounds.playPowerup();
            } else {
              st.lives--;
              setLives(st.lives);

              if (st.lives <= 0) {
                sounds.playGameOver();
                st.gameState = 'gameover';
                setGameState('gameover');
                if (st.score > highScore) {
                  setHighScore(st.score);
                  localStorage.setItem('cyberblast_highscore', st.score.toString());
                }
              }
            }
          }

          // Reached bottom
          if (enemy.y > height + 30) {
            st.enemies.splice(e, 1);
          }
        }

        // 6. Update & Draw PowerUps
        for (let p = st.powerups.length - 1; p >= 0; p--) {
          const pow = st.powerups[p];
          pow.y += pow.vy;

          ctx.beginPath();
          ctx.arc(pow.x, pow.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = pow.color;
          ctx.shadowColor = pow.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pickup collision
          const pDist = Math.hypot(st.playerX - pow.x, st.playerY - pow.y);
          if (pDist < 26) {
            sounds.playPowerup();
            if (pow.type === 'rapid') {
              st.rapidFire = 50;
              setRapidFireTimer(50);
            } else if (pow.type === 'shield') {
              st.hasShield = true;
              setHasShield(true);
            } else if (pow.type === 'bomb') {
              // Destroy all enemies on screen
              for (const en of st.enemies) {
                addExplosion(en.x, en.y, en.color, 12);
                st.score += en.points;
              }
              st.enemies = [];
              setScore(st.score);
            }
            st.powerups.splice(p, 1);
          } else if (pow.y > height + 20) {
            st.powerups.splice(p, 1);
          }
        }

        // 7. Draw Player Spaceship
        ctx.save();
        ctx.translate(st.playerX, st.playerY);

        // Shield Aura
        if (st.hasShield) {
          ctx.beginPath();
          ctx.arc(0, 0, 26, 0, Math.PI * 2);
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = 14;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Spaceship Body (Cyber Neon Wedge)
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(16, 12);
        ctx.lineTo(0, 6);
        ctx.lineTo(-16, 12);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#E50914';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Cockpit
        ctx.beginPath();
        ctx.arc(0, -2, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#E50914';
        ctx.fill();

        // Thruster Engine Flame
        ctx.beginPath();
        ctx.moveTo(-6, 8);
        ctx.lineTo(0, 18 + Math.random() * 6);
        ctx.lineTo(6, 8);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();

        ctx.restore();
      }

      // 8. Update & Draw Particles (Always active)
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          st.particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleCanvasMove);
      canvas.removeEventListener('touchmove', handleCanvasMove);
    };
  }, [isOpen, highScore]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-[560px] bg-[#0e0e12] border border-white/15 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914]">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                  <span>CYBER BLAST</span>
                  <span className="px-1.5 py-0.5 rounded bg-red-600/30 border border-red-500/40 text-[9px] font-mono text-red-300">
                    ARCADE v1.0
                  </span>
                </h3>
                <p className="text-zinc-400 text-[10px] font-mono">Move: [A/D] or Drag • Shoot: Auto</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Sound Mute/Unmute */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Close Game (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Game Stats HUD (When Playing) */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-black/40 border-b border-white/[0.06] text-xs font-mono">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-zinc-500 text-[10px] block">SCORE</span>
                <span className="text-white font-bold text-sm text-[#E50914]">{score}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">HIGH SCORE</span>
                <span className="text-zinc-300 font-bold">{highScore}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <span className="text-zinc-500 text-[10px] block">WAVE</span>
                <span className="text-purple-400 font-bold">Lvl {wave}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">SHIELD / LIVES</span>
                <span className="text-emerald-400 font-bold">
                  {hasShield ? '🛡️ ' : ''}{'❤️ '.repeat(Math.max(0, lives))}
                </span>
              </div>
            </div>
          </div>

          {/* Game Canvas Container */}
          <div className="relative w-full aspect-[520/540] flex items-center justify-center bg-[#090A0F] overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />

            {/* Start Screen Overlay */}
            {gameState === 'menu' && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E50914] to-purple-800 flex items-center justify-center text-white shadow-[0_0_30px_rgba(229,9,20,0.6)]">
                  <Gamepad2 className="w-8 h-8 animate-bounce" />
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-bebas text-4xl text-white tracking-wider">CYBER BLAST</h2>
                  <p className="text-zinc-400 text-xs max-w-xs font-light">
                    Take out invading glitch packets, avoid firewalls, and collect rapid-fire powerups!
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 text-[11px] font-mono text-zinc-300">
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-sky-400" /> Shield
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-red-400" /> Dual Laser
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 flex items-center gap-1.5">
                    <Bomb className="w-3.5 h-3.5 text-amber-400" /> EMP Bomb
                  </span>
                </div>

                <button
                  onClick={startGame}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E50914] to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(229,9,20,0.5)] active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Game (Space)</span>
                </button>
              </div>
            )}

            {/* Game Over Screen Overlay */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-[#E50914] shadow-[0_0_25px_rgba(229,9,20,0.5)]">
                  <Trophy className="w-7 h-7 text-amber-400" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bebas text-3xl text-white tracking-wider">SYSTEM OVERLOAD</h3>
                  <p className="text-zinc-400 text-xs font-mono">You made it to Wave {wave}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 w-64 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>FINAL SCORE</span>
                    <span className="text-white font-bold text-sm text-[#E50914]">{score}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 pt-1 border-t border-white/10">
                    <span>BEST RECORD</span>
                    <span className="text-amber-400 font-bold text-sm">{highScore}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E50914] to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold text-xs tracking-wider uppercase shadow-[0_4px_18px_rgba(229,9,20,0.5)] active:scale-95 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white font-semibold text-xs tracking-wide transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NetflixArcadeModal;
