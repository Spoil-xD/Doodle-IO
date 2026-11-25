/**
 * Doodle IO - Expanded Topics Library
 * Each topic has 4 completely unique visual drawing variants / styles.
 * Bot 1, Bot 2, Bot 3, and Bot 4 each draw a completely different variant!
 */

const GAME_TOPICS = [
  // 1. PIZZA SLICE
  {
    id: 'pizza',
    name: 'Pizza Slice',
    emoji: '🍕',
    category: 'Food',
    variants: [
      {
        style: 'Classic Pepperoni',
        strokes: [
          { type: 'path', points: [[100, 30], [25, 230], [175, 230]], fill: '#FFE066', stroke: '#1e1e2e', width: 4 },
          { type: 'arc', x: 100, y: 30, r: 80, start: 3.3, end: 6.1, fill: '#E67E22', stroke: '#1e1e2e', width: 6 },
          { type: 'circle', x: 80, y: 130, r: 16, fill: '#E74C3C', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 120, y: 170, r: 18, fill: '#E74C3C', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 95, y: 200, r: 14, fill: '#E74C3C', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 130, y: 110, r: 10, fill: '#27AE60', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 65, y: 175, r: 9, fill: '#27AE60', stroke: '#1e1e2e', width: 2 },
          { type: 'drip', x: 100, y: 230, len: 25, color: '#F1C40F' }
        ]
      },
      {
        style: 'Cute Kawaii Pizza',
        strokes: [
          { type: 'path', points: [[100, 40], [35, 215], [165, 215]], fill: '#FFD32A', stroke: '#1e1e2e', width: 5, round: true },
          { type: 'rect', x: 30, y: 210, w: 140, h: 22, r: 10, fill: '#F39C12', stroke: '#1e1e2e', width: 4 },
          // Big cute anime eyes
          { type: 'circle', x: 78, y: 135, r: 10, fill: '#1e1e2e' },
          { type: 'circle', x: 75, y: 132, r: 3.5, fill: '#FFFFFF' },
          { type: 'circle', x: 122, y: 135, r: 10, fill: '#1e1e2e' },
          { type: 'circle', x: 119, y: 132, r: 3.5, fill: '#FFFFFF' },
          // Cute smile :3
          { type: 'arc', x: 94, y: 150, r: 8, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 3 },
          { type: 'arc', x: 106, y: 150, r: 8, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 3 },
          // Pink blush
          { type: 'oval', x: 62, y: 148, rx: 9, ry: 5, fill: '#FF7675' },
          { type: 'oval', x: 138, y: 148, rx: 9, ry: 5, fill: '#FF7675' },
          // Heart pepperoni
          { type: 'heart', x: 100, y: 95, size: 14, fill: '#FF4757', stroke: '#1e1e2e', width: 2 },
          { type: 'heart', x: 100, y: 185, size: 12, fill: '#FF4757', stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'Supreme Loaded Veggie',
        strokes: [
          { type: 'path', points: [[100, 30], [15, 225], [185, 225]], fill: '#F7D794', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 10, y: 218, w: 180, h: 26, r: 8, fill: '#E67E22', stroke: '#1e1e2e', width: 5 },
          // Green peppers strips
          { type: 'rect', x: 75, y: 110, w: 28, h: 8, r: 3, rot: 0.3, fill: '#2ED573', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 115, y: 150, w: 26, h: 8, r: 3, rot: -0.4, fill: '#2ED573', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 55, y: 175, w: 28, h: 8, r: 3, rot: 0.2, fill: '#2ED573', stroke: '#1e1e2e', width: 2 },
          // Black olive rings
          { type: 'circle', x: 115, y: 105, r: 9, fill: 'none', stroke: '#2C3E50', width: 5 },
          { type: 'circle', x: 80, y: 160, r: 9, fill: 'none', stroke: '#2C3E50', width: 5 },
          { type: 'circle', x: 125, y: 190, r: 9, fill: 'none', stroke: '#2C3E50', width: 5 },
          // Mushrooms
          { type: 'mushroom', x: 95, y: 135, size: 12, fill: '#D2B48C' },
          { type: 'mushroom', x: 60, y: 140, size: 10, fill: '#D2B48C' },
          { type: 'mushroom', x: 95, y: 195, size: 11, fill: '#D2B48C' }
        ]
      },
      {
        style: 'Cool Guy with Shades',
        strokes: [
          { type: 'path', points: [[110, 35], [20, 220], [180, 235]], fill: '#FFA502', stroke: '#1e1e2e', width: 5 },
          { type: 'arc', x: 100, y: 35, r: 85, start: 3.2, end: 6.2, fill: '#D35400', stroke: '#1e1e2e', width: 6 },
          // Retro Cool Sunglasses
          { type: 'rect', x: 50, y: 115, w: 42, h: 24, r: 4, fill: '#1e1e2e', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 105, y: 115, w: 42, h: 24, r: 4, fill: '#1e1e2e', stroke: '#1e1e2e', width: 2 },
          { type: 'line', x1: 92, y1: 125, x2: 105, y2: 125, stroke: '#1e1e2e', width: 4 },
          { type: 'line', x1: 54, y1: 120, x2: 74, y2: 135, stroke: '#70A1FF', width: 3 },
          { type: 'line', x1: 109, y1: 120, x2: 129, y2: 135, stroke: '#70A1FF', width: 3 },
          // Smirk mouth with bite mark
          { type: 'arc', x: 100, y: 165, r: 18, start: 0.1, end: Math.PI * 0.9, stroke: '#1e1e2e', width: 4 },
          // Bite on side
          { type: 'circle', x: 26, y: 180, r: 14, fill: '#FFFFFF', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 135, y: 185, r: 15, fill: '#E74C3C', stroke: '#1e1e2e', width: 3 }
        ]
      }
    ]
  },

  // 2. RUBBER DUCK
  {
    id: 'rubber-duck',
    name: 'Rubber Duck',
    emoji: '🦆',
    category: 'Toy',
    variants: [
      {
        style: 'Classic Bathtub Duck',
        strokes: [
          { type: 'circle', x: 115, y: 160, r: 52, fill: '#FFD12A', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 72, y: 105, r: 35, fill: '#FFD12A', stroke: '#1e1e2e', width: 5 },
          { type: 'oval', x: 42, y: 110, rx: 18, ry: 9, fill: '#FF7675', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 68, y: 95, r: 5, fill: '#1e1e2e' },
          { type: 'circle', x: 66, y: 93, r: 2, fill: '#FFFFFF' },
          { type: 'arc', x: 120, y: 155, r: 28, start: 0.3, end: 2.7, fill: '#F39C12', stroke: '#1e1e2e', width: 4 },
          { type: 'wave', y: 215, color: '#4D96FF' },
          { type: 'wave', y: 232, color: '#70A1FF' }
        ]
      },
      {
        style: 'Detective Duck with Top Hat',
        strokes: [
          { type: 'circle', x: 110, y: 165, r: 50, fill: '#FED330', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 75, y: 115, r: 34, fill: '#FED330', stroke: '#1e1e2e', width: 5 },
          { type: 'oval', x: 46, y: 122, rx: 17, ry: 8, fill: '#FA8231', stroke: '#1e1e2e', width: 4 },
          // Detective Top Hat
          { type: 'rect', x: 50, y: 75, w: 55, h: 32, r: 3, fill: '#2C3E50', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 40, y: 102, w: 75, h: 8, r: 3, fill: '#E74C3C', stroke: '#1e1e2e', width: 3 },
          // Monocle on eye
          { type: 'circle', x: 72, y: 108, r: 9, fill: '#DFF9FB', stroke: '#F39C12', width: 3 },
          { type: 'circle', x: 72, y: 108, r: 4, fill: '#1e1e2e' },
          // Bubbles
          { type: 'circle', x: 155, y: 90, r: 10, fill: '#74B9FF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 170, y: 125, r: 7, fill: '#74B9FF', stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'Kawaii Fluffy Baby Duck',
        strokes: [
          { type: 'circle', x: 100, y: 155, r: 55, fill: '#FFF275', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 100, y: 90, r: 42, fill: '#FFF275', stroke: '#1e1e2e', width: 5 },
          // Giant sparkly eyes
          { type: 'circle', x: 80, y: 88, r: 10, fill: '#1e1e2e' },
          { type: 'circle', x: 77, y: 85, r: 4, fill: '#FFFFFF' },
          { type: 'circle', x: 120, y: 88, r: 10, fill: '#1e1e2e' },
          { type: 'circle', x: 117, y: 85, r: 4, fill: '#FFFFFF' },
          // Tiny beak
          { type: 'oval', x: 100, y: 104, rx: 11, ry: 7, fill: '#FF9F1A', stroke: '#1e1e2e', width: 3 },
          // Blush cheeks
          { type: 'circle', x: 65, y: 102, r: 8, fill: '#FF7675' },
          { type: 'circle', x: 135, y: 102, r: 8, fill: '#FF7675' },
          // Floating love heart
          { type: 'heart', x: 100, y: 35, size: 16, fill: '#FF4757', stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'Inflatable Pool Duck with Shades',
        strokes: [
          // Striped float ring
          { type: 'oval', x: 100, y: 175, rx: 75, ry: 35, fill: '#FF4757', stroke: '#1e1e2e', width: 5 },
          { type: 'oval', x: 100, y: 175, rx: 42, ry: 18, fill: '#4D96FF', stroke: '#1e1e2e', width: 4 },
          // Duck neck & head rising out
          { type: 'capsule', x: 70, y: 120, w: 26, h: 70, fill: '#FFD12A', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 70, y: 80, r: 30, fill: '#FFD12A', stroke: '#1e1e2e', width: 5 },
          { type: 'oval', x: 42, y: 85, rx: 16, ry: 8, fill: '#FF7675', stroke: '#1e1e2e', width: 3 },
          // Sunglasses
          { type: 'rect', x: 55, y: 72, w: 28, h: 16, r: 3, fill: '#1e1e2e', stroke: '#1e1e2e', width: 2 },
          { type: 'line', x1: 60, y1: 76, x2: 74, y2: 84, stroke: '#FFFFFF', width: 2 }
        ]
      }
    ]
  },

  // 3. ROCKET SHIP
  {
    id: 'rocket-ship',
    name: 'Rocket Ship',
    emoji: '🚀',
    category: 'Space',
    variants: [
      {
        style: 'Retro Sci-Fi Rocket',
        strokes: [
          { type: 'oval', x: 100, y: 110, rx: 32, ry: 75, rot: 0, fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[68, 60], [100, 15], [132, 60]], fill: '#FF4757', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[68, 140], [35, 175], [72, 170]], fill: '#2ED573', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[132, 140], [165, 175], [128, 170]], fill: '#2ED573', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 105, r: 16, fill: '#70A1FF', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 96, y: 101, r: 5, fill: '#FFFFFF' },
          { type: 'path', points: [[85, 185], [100, 245], [115, 185]], fill: '#FFA502', stroke: '#FF4757', width: 3 }
        ]
      },
      {
        style: 'Cute Chibi Space Pod',
        strokes: [
          // Round spherical pod
          { type: 'circle', x: 100, y: 110, r: 55, fill: '#70A1FF', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[70, 60], [100, 25], [130, 60]], fill: '#FF6B6B', stroke: '#1e1e2e', width: 4 },
          // Big circular window with waving cute alien
          { type: 'circle', x: 100, y: 110, r: 34, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 110, r: 20, fill: '#2ED573' }, // green alien face
          { type: 'circle', x: 93, y: 108, r: 4, fill: '#1e1e2e' },
          { type: 'circle', x: 107, y: 108, r: 4, fill: '#1e1e2e' },
          { type: 'arc', x: 100, y: 118, r: 6, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 2 },
          // Side jet boosters
          { type: 'rect', x: 38, y: 110, w: 14, h: 35, r: 4, fill: '#FFA502', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 148, y: 110, w: 14, h: 35, r: 4, fill: '#FFA502', stroke: '#1e1e2e', width: 3 },
          { type: 'path', points: [[40, 145], [45, 175], [50, 145]], fill: '#FF4757' },
          { type: 'path', points: [[150, 145], [155, 175], [160, 145]], fill: '#FF4757' }
        ]
      },
      {
        style: 'High-Tech Space Cruiser',
        strokes: [
          // Sleek angular hull
          { type: 'path', points: [[100, 20], [135, 170], [100, 160], [65, 170]], fill: '#DFE4EA', stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 100, y1: 20, x2: 100, y2: 160, stroke: '#747D8C', width: 3 },
          // Swept-back wings
          { type: 'path', points: [[65, 130], [20, 180], [65, 165]], fill: '#3742FA', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[135, 130], [180, 180], [135, 165]], fill: '#3742FA', stroke: '#1e1e2e', width: 4 },
          // Cyan cockpit visor
          { type: 'path', points: [[90, 70], [100, 50], [110, 70], [100, 85]], fill: '#00D2D3', stroke: '#1e1e2e', width: 3 },
          // Dual plasma thrusters
          { type: 'path', points: [[80, 165], [88, 225], [96, 165]], fill: '#00D2D3', stroke: '#54A0FF', width: 2 },
          { type: 'path', points: [[104, 165], [112, 225], [120, 165]], fill: '#00D2D3', stroke: '#54A0FF', width: 2 }
        ]
      },
      {
        style: 'Funky Blast-Off Rocket',
        strokes: [
          // Tilted curved rocket
          { type: 'path', points: [[150, 30], [155, 100], [90, 175], [50, 150]], fill: '#FF6B6B', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[150, 30], [168, 48], [145, 65]], fill: '#FFD12A', stroke: '#1e1e2e', width: 3 },
          // Big blast smoke cloud
          { type: 'circle', x: 60, y: 195, r: 24, fill: '#F1F2F6', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 85, y: 215, r: 28, fill: '#F1F2F6', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 40, y: 220, r: 20, fill: '#F1F2F6', stroke: '#1e1e2e', width: 3 },
          // Flame tongue
          { type: 'path', points: [[80, 160], [45, 185], [95, 180]], fill: '#FFA502' },
          // Stars in sky
          { type: 'star', x: 45, y: 50, size: 10, color: '#FFD12A' },
          { type: 'star', x: 165, y: 120, size: 8, color: '#FFD12A' },
          { type: 'star', x: 30, y: 110, size: 12, color: '#FFD12A' }
        ]
      }
    ]
  },

  // 4. BICYCLE
  {
    id: 'bicycle',
    name: 'Bicycle',
    emoji: '🚲',
    category: 'Vehicle',
    variants: [
      {
        style: 'Classic Red Racer',
        strokes: [
          { type: 'circle', x: 55, y: 165, r: 35, fill: 'none', stroke: '#1e1e2e', width: 6 },
          { type: 'circle', x: 145, y: 165, r: 35, fill: 'none', stroke: '#1e1e2e', width: 6 },
          { type: 'circle', x: 55, y: 165, r: 10, fill: '#74B9FF', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 145, y: 165, r: 10, fill: '#74B9FF', stroke: '#1e1e2e', width: 3 },
          { type: 'line', x1: 55, y1: 165, x2: 95, y2: 165, stroke: '#FF4757', width: 6 },
          { type: 'line', x1: 55, y1: 165, x2: 85, y2: 115, stroke: '#FF4757', width: 6 },
          { type: 'line', x1: 95, y1: 165, x2: 125, y2: 115, stroke: '#FF4757', width: 6 },
          { type: 'line', x1: 85, y1: 115, x2: 125, y2: 115, stroke: '#FF4757', width: 6 },
          { type: 'line', x1: 125, y1: 115, x2: 145, y2: 165, stroke: '#FF4757', width: 6 },
          { type: 'line', x1: 75, y1: 105, x2: 95, y2: 105, stroke: '#1e1e2e', width: 7 },
          { type: 'line', x1: 125, y1: 115, x2: 120, y2: 85, stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 110, y1: 85, x2: 135, y2: 85, stroke: '#1e1e2e', width: 6 }
        ]
      },
      {
        style: 'Cute City Cruiser with Basket',
        strokes: [
          // Pastel mint wheels
          { type: 'circle', x: 50, y: 170, r: 32, fill: '#E8F5E9', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 150, y: 170, r: 32, fill: '#E8F5E9', stroke: '#1e1e2e', width: 5 },
          // Step-through curved frame
          { type: 'arc', x: 100, y: 150, r: 42, start: 0.1, end: Math.PI * 0.9, stroke: '#2ED573', width: 6 },
          { type: 'line', x1: 50, y1: 170, x2: 85, y2: 120, stroke: '#2ED573', width: 6 },
          { type: 'line', x1: 150, y1: 170, x2: 130, y2: 105, stroke: '#2ED573', width: 6 },
          // Cute brown basket on handlebars
          { type: 'rect', x: 135, y: 92, w: 28, h: 22, r: 4, fill: '#F39C12', stroke: '#1e1e2e', width: 3 },
          // Flowers in basket
          { type: 'circle', x: 142, y: 90, r: 6, fill: '#FF4757' },
          { type: 'circle', x: 154, y: 88, r: 6, fill: '#FFD12A' },
          // Comfy brown seat
          { type: 'oval', x: 80, y: 112, rx: 14, ry: 7, fill: '#D35400', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Vintage Penny Farthing',
        strokes: [
          // Giant front wheel
          { type: 'circle', x: 90, y: 120, r: 65, fill: 'none', stroke: '#1e1e2e', width: 6 },
          { type: 'circle', x: 90, y: 120, r: 12, fill: '#FFA502', stroke: '#1e1e2e', width: 3 },
          // Tiny rear wheel
          { type: 'circle', x: 165, y: 180, r: 18, fill: 'none', stroke: '#1e1e2e', width: 5 },
          // Curved backbone
          { type: 'arc', x: 120, y: 135, r: 50, start: 3.2, end: 5.8, stroke: '#1e1e2e', width: 6 },
          { type: 'line', x1: 90, y1: 120, x2: 90, y2: 50, stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 80, y1: 50, x2: 105, y2: 50, stroke: '#1e1e2e', width: 6 },
          // High seat
          { type: 'rect', x: 96, y: 55, w: 18, h: 8, r: 3, fill: '#833471', stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'BMX Stunt Bike',
        strokes: [
          // Chunky tread tires
          { type: 'circle', x: 55, y: 165, r: 34, fill: '#2F3542', stroke: '#1e1e2e', width: 7 },
          { type: 'circle', x: 145, y: 165, r: 34, fill: '#2F3542', stroke: '#1e1e2e', width: 7 },
          { type: 'circle', x: 55, y: 165, r: 18, fill: '#FFA502', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 145, y: 165, r: 18, fill: '#FFA502', stroke: '#1e1e2e', width: 3 },
          // Compact aggressive frame
          { type: 'line', x1: 55, y1: 165, x2: 90, y2: 165, stroke: '#9B59B6', width: 6 },
          { type: 'line', x1: 55, y1: 165, x2: 85, y2: 130, stroke: '#9B59B6', width: 6 },
          { type: 'line', x1: 90, y1: 165, x2: 125, y2: 130, stroke: '#9B59B6', width: 6 },
          { type: 'line', x1: 85, y1: 130, x2: 125, y2: 130, stroke: '#9B59B6', width: 6 },
          { type: 'line', x1: 125, y1: 130, x2: 145, y2: 165, stroke: '#9B59B6', width: 6 },
          // High-rise handlebars
          { type: 'line', x1: 125, y1: 130, x2: 120, y2: 90, stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 105, y1: 85, x2: 135, y2: 85, stroke: '#1e1e2e', width: 6 },
          // Wheel stunt pegs
          { type: 'rect', x: 42, y: 162, w: 12, h: 6, fill: '#DFE4EA', stroke: '#1e1e2e', width: 2 }
        ]
      }
    ]
  },

  // 5. PINEAPPLE
  {
    id: 'pineapple',
    name: 'Pineapple',
    emoji: '🍍',
    category: 'Food',
    variants: [
      {
        style: 'Classic Golden Pineapple',
        strokes: [
          { type: 'oval', x: 100, y: 155, rx: 45, ry: 60, fill: '#FFA502', stroke: '#1e1e2e', width: 5 },
          { type: 'leaf', x: 100, y: 95, angle: 0, color: '#2ED573' },
          { type: 'leaf', x: 90, y: 95, angle: -0.3, color: '#26AF61' },
          { type: 'leaf', x: 110, y: 95, angle: 0.3, color: '#2ED573' },
          { type: 'leaf', x: 80, y: 100, angle: -0.6, color: '#10AC84' },
          { type: 'leaf', x: 120, y: 100, angle: 0.6, color: '#10AC84' },
          { type: 'gridLines', cx: 100, cy: 155, rx: 42, ry: 56, stroke: '#D35400', width: 3 }
        ]
      },
      {
        style: 'Cute Kawaii Pineapple',
        strokes: [
          { type: 'oval', x: 100, y: 150, rx: 48, ry: 58, fill: '#FFD12A', stroke: '#1e1e2e', width: 5 },
          // Crown of cute leaves
          { type: 'leaf', x: 100, y: 92, angle: 0, color: '#2ED573' },
          { type: 'leaf', x: 85, y: 95, angle: -0.4, color: '#2ED573' },
          { type: 'leaf', x: 115, y: 95, angle: 0.4, color: '#2ED573' },
          // Big smiling eyes
          { type: 'circle', x: 82, y: 142, r: 9, fill: '#1e1e2e' },
          { type: 'circle', x: 79, y: 139, r: 3, fill: '#FFFFFF' },
          { type: 'circle', x: 118, y: 142, r: 9, fill: '#1e1e2e' },
          { type: 'circle', x: 115, y: 139, r: 3, fill: '#FFFFFF' },
          { type: 'arc', x: 100, y: 155, r: 12, start: 0, end: Math.PI, fill: '#FF4757', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 70, y: 154, r: 7, fill: '#FF7675' },
          { type: 'circle', x: 130, y: 154, r: 7, fill: '#FF7675' }
        ]
      },
      {
        style: 'Tropical Drink in Pineapple',
        strokes: [
          { type: 'oval', x: 100, y: 160, rx: 46, ry: 55, fill: '#FFA502', stroke: '#1e1e2e', width: 5 },
          // Cut top rim
          { type: 'oval', x: 100, y: 110, rx: 38, ry: 12, fill: '#FFEAA7', stroke: '#1e1e2e', width: 4 },
          // Striped drinking straw
          { type: 'line', x1: 105, y1: 110, x2: 135, y2: 45, stroke: '#FF4757', width: 8 },
          { type: 'line', x1: 105, y1: 110, x2: 135, y2: 45, stroke: '#FFFFFF', width: 4 },
          // Cocktail paper umbrella
          { type: 'path', points: [[60, 95], [85, 65], [105, 95]], fill: '#FF9FF3', stroke: '#1e1e2e', width: 3 },
          { type: 'line', x1: 85, y1: 65, x2: 85, y2: 115, stroke: '#1e1e2e', width: 3 },
          // Hibiscus flower
          { type: 'circle', x: 65, y: 115, r: 12, fill: '#FF4757' },
          { type: 'circle', x: 65, y: 115, r: 4, fill: '#FFD12A' }
        ]
      },
      {
        style: 'Cool Sunglasses Pineapple',
        strokes: [
          { type: 'oval', x: 100, y: 155, rx: 45, ry: 60, fill: '#F39C12', stroke: '#1e1e2e', width: 5 },
          { type: 'leaf', x: 100, y: 95, angle: 0, color: '#2ED573' },
          { type: 'leaf', x: 85, y: 95, angle: -0.4, color: '#2ED573' },
          { type: 'leaf', x: 115, y: 95, angle: 0.4, color: '#2ED573' },
          // Chunky Retro Sunglasses
          { type: 'rect', x: 65, y: 135, w: 32, h: 22, r: 4, fill: '#1e1e2e', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 103, y: 135, w: 32, h: 22, r: 4, fill: '#1e1e2e', stroke: '#1e1e2e', width: 2 },
          { type: 'line', x1: 97, y1: 142, x2: 103, y2: 142, stroke: '#1e1e2e', width: 4 },
          { type: 'line', x1: 68, y1: 138, x2: 82, y2: 152, stroke: '#54A0FF', width: 3 },
          { type: 'line', x1: 106, y1: 138, x2: 120, y2: 152, stroke: '#54A0FF', width: 3 },
          // Toothpick smirk
          { type: 'line', x1: 100, y1: 180, x2: 125, y2: 172, stroke: '#1e1e2e', width: 3 }
        ]
      }
    ]
  },

  // 6. SUNGLASSES
  {
    id: 'sunglasses',
    name: 'Sunglasses',
    emoji: '🕶️',
    category: 'Fashion',
    variants: [
      {
        style: 'Classic Black Wayfarer',
        strokes: [
          { type: 'path', points: [[30, 110], [50, 105], [88, 105], [85, 155], [38, 150]], fill: '#1e1e2e', stroke: '#1e1e2e', width: 6, round: true },
          { type: 'path', points: [[112, 105], [150, 105], [170, 110], [162, 150], [115, 155]], fill: '#1e1e2e', stroke: '#1e1e2e', width: 6, round: true },
          { type: 'line', x1: 88, y1: 115, x2: 112, y2: 115, stroke: '#FF4757', width: 8 },
          { type: 'line', x1: 30, y1: 110, x2: 15, y2: 100, stroke: '#FF4757', width: 6 },
          { type: 'line', x1: 170, y1: 110, x2: 185, y2: 100, stroke: '#FF4757', width: 6 },
          { type: 'line', x1: 45, y1: 115, x2: 70, y2: 145, stroke: '#70A1FF', width: 4 },
          { type: 'line', x1: 125, y1: 115, x2: 150, y2: 145, stroke: '#70A1FF', width: 4 }
        ]
      },
      {
        style: 'Pink Heart Festival Glasses',
        strokes: [
          { type: 'heart', x: 60, y: 125, size: 32, fill: '#FF9FF3', stroke: '#1e1e2e', width: 5 },
          { type: 'heart', x: 140, y: 125, size: 32, fill: '#FF9FF3', stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 90, y1: 125, x2: 110, y2: 125, stroke: '#FF69B4', width: 6 },
          { type: 'line', x1: 30, y1: 120, x2: 12, y2: 110, stroke: '#FF69B4', width: 5 },
          { type: 'line', x1: 170, y1: 120, x2: 188, y2: 110, stroke: '#FF69B4', width: 5 },
          // Lens sparkles
          { type: 'star', x: 50, y: 120, size: 6, color: '#FFFFFF' },
          { type: 'star', x: 130, y: 120, size: 6, color: '#FFFFFF' }
        ]
      },
      {
        style: 'Golden Aviators with Sunset Glint',
        strokes: [
          { type: 'oval', x: 62, y: 130, rx: 30, ry: 26, fill: '#FFA502', stroke: '#F1C40F', width: 5 },
          { type: 'oval', x: 138, y: 130, rx: 30, ry: 26, fill: '#FFA502', stroke: '#F1C40F', width: 5 },
          { type: 'line', x1: 92, y1: 120, x2: 108, y2: 120, stroke: '#F1C40F', width: 4 },
          { type: 'line', x1: 50, y1: 110, x2: 150, y2: 110, stroke: '#F1C40F', width: 4 }, // top brow bar
          { type: 'line', x1: 45, y1: 122, x2: 78, y2: 142, stroke: '#FFFFFF', width: 4 },
          { type: 'line', x1: 122, y1: 122, x2: 155, y2: 142, stroke: '#FFFFFF', width: 4 }
        ]
      },
      {
        style: '8-Bit Thug Life Pixel Glasses',
        strokes: [
          // Pixel steps left lens
          { type: 'rect', x: 35, y: 120, w: 55, h: 22, fill: '#1e1e2e' },
          { type: 'rect', x: 110, y: 120, w: 55, h: 22, fill: '#1e1e2e' },
          { type: 'rect', x: 90, y: 125, w: 20, h: 6, fill: '#1e1e2e' },
          // White pixel glints
          { type: 'rect', x: 42, y: 124, w: 8, h: 8, fill: '#FFFFFF' },
          { type: 'rect', x: 50, y: 132, w: 8, h: 8, fill: '#FFFFFF' },
          { type: 'rect', x: 117, y: 124, w: 8, h: 8, fill: '#FFFFFF' },
          { type: 'rect', x: 125, y: 132, w: 8, h: 8, fill: '#FFFFFF' }
        ]
      }
    ]
  },

  // 7. CACTUS
  {
    id: 'cactus',
    name: 'Cactus',
    emoji: '🌵',
    category: 'Nature',
    variants: [
      {
        style: 'Classic Saguaro with Flower',
        strokes: [
          { type: 'path', points: [[65, 190], [135, 190], [125, 245], [75, 245]], fill: '#E67E22', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 60, y: 180, w: 80, h: 14, r: 4, fill: '#D35400', stroke: '#1e1e2e', width: 4 },
          { type: 'capsule', x: 100, y: 120, w: 32, h: 110, fill: '#2ED573', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[85, 130], [50, 130], [50, 85]], stroke: '#2ED573', width: 18, cap: 'round', fill: 'none' },
          { type: 'path', points: [[85, 130], [50, 130], [50, 85]], stroke: '#1e1e2e', width: 5, cap: 'round', fill: 'none' },
          { type: 'path', points: [[115, 110], [145, 110], [145, 75]], stroke: '#2ED573', width: 16, cap: 'round', fill: 'none' },
          { type: 'path', points: [[115, 110], [145, 110], [145, 75]], stroke: '#1e1e2e', width: 5, cap: 'round', fill: 'none' },
          { type: 'circle', x: 100, y: 58, r: 8, fill: '#FF4757', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Cute Smiling Kawaii Cactus',
        strokes: [
          // Cute pastel pink pot
          { type: 'rect', x: 65, y: 175, w: 70, h: 55, r: 8, fill: '#FF9FF3', stroke: '#1e1e2e', width: 5 },
          // Round chubby cactus
          { type: 'circle', x: 100, y: 120, r: 48, fill: '#55E6C1', stroke: '#1e1e2e', width: 5 },
          // Big smiling eyes
          { type: 'circle', x: 85, y: 115, r: 7, fill: '#1e1e2e' },
          { type: 'circle', x: 83, y: 113, r: 2.5, fill: '#FFFFFF' },
          { type: 'circle', x: 115, y: 115, r: 7, fill: '#1e1e2e' },
          { type: 'circle', x: 113, y: 113, r: 2.5, fill: '#FFFFFF' },
          { type: 'arc', x: 100, y: 125, r: 8, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 74, y: 125, r: 6, fill: '#FF7675' },
          { type: 'circle', x: 126, y: 125, r: 6, fill: '#FF7675' },
          // Little flower bow on head
          { type: 'circle', x: 100, y: 70, r: 9, fill: '#FFD12A', stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'Cowboy Cactus with Hat',
        strokes: [
          { type: 'capsule', x: 100, y: 140, w: 36, h: 100, fill: '#10AC84', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[85, 150], [45, 150], [45, 110]], stroke: '#10AC84', width: 16, cap: 'round', fill: 'none' },
          { type: 'path', points: [[85, 150], [45, 150], [45, 110]], stroke: '#1e1e2e', width: 4, cap: 'round', fill: 'none' },
          { type: 'path', points: [[115, 135], [155, 135], [155, 95]], stroke: '#10AC84', width: 16, cap: 'round', fill: 'none' },
          { type: 'path', points: [[115, 135], [155, 135], [155, 95]], stroke: '#1e1e2e', width: 4, cap: 'round', fill: 'none' },
          // Brown Cowboy Hat
          { type: 'oval', x: 100, y: 92, rx: 48, ry: 12, fill: '#833471', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 80, y: 65, w: 40, h: 28, r: 6, fill: '#833471', stroke: '#1e1e2e', width: 4 },
          // Red bandana scarf
          { type: 'path', points: [[82, 120], [118, 120], [100, 135]], fill: '#FF4757', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Desert Sunset Scene Cactus',
        strokes: [
          // Orange glowing desert sun in background
          { type: 'circle', x: 100, y: 130, r: 65, fill: '#FFA502' },
          { type: 'rect', x: 20, y: 185, w: 160, h: 55, fill: '#E67E22' },
          // Silhouette dark green cactus
          { type: 'capsule', x: 100, y: 140, w: 26, h: 90, fill: '#1e1e2e' },
          { type: 'path', points: [[90, 145], [60, 145], [60, 110]], stroke: '#1e1e2e', width: 14, cap: 'round', fill: 'none' },
          { type: 'path', points: [[110, 130], [140, 130], [140, 95]], stroke: '#1e1e2e', width: 14, cap: 'round', fill: 'none' }
        ]
      }
    ]
  },

  // 8. ASTRONAUT
  {
    id: 'astronaut',
    name: 'Astronaut',
    emoji: '👨‍🚀',
    category: 'Character',
    variants: [
      {
        style: 'Classic NASA Spacewalker',
        strokes: [
          { type: 'circle', x: 100, y: 95, r: 42, fill: '#F1F2F6', stroke: '#1e1e2e', width: 5 },
          { type: 'oval', x: 100, y: 95, rx: 28, ry: 20, fill: '#FFA502', stroke: '#1e1e2e', width: 4 },
          { type: 'line', x1: 85, y1: 88, x2: 110, y2: 88, stroke: '#FFFFFF', width: 5, cap: 'round' },
          { type: 'rect', x: 72, y: 140, w: 56, h: 65, r: 12, fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 82, y: 155, w: 36, h: 25, r: 4, fill: '#70A1FF', stroke: '#1e1e2e', width: 3 },
          { type: 'line', x1: 72, y1: 150, x2: 45, y2: 190, stroke: '#1e1e2e', width: 12, cap: 'round' },
          { type: 'line', x1: 128, y1: 150, x2: 155, y2: 135, stroke: '#1e1e2e', width: 12, cap: 'round' },
          { type: 'circle', x: 158, y: 130, r: 10, fill: '#FF4757', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Cute Chibi with Moon Balloon',
        strokes: [
          // Giant round cute helmet
          { type: 'circle', x: 100, y: 105, r: 48, fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 100, y: 105, r: 35, fill: '#34495E', stroke: '#1e1e2e', width: 3 },
          // Cute anime face inside visor
          { type: 'circle', x: 88, y: 105, r: 5, fill: '#FFFFFF' },
          { type: 'circle', x: 112, y: 105, r: 5, fill: '#FFFFFF' },
          { type: 'arc', x: 100, y: 112, r: 5, start: 0, end: Math.PI, stroke: '#FFFFFF', width: 2 },
          // Tiny body
          { type: 'rect', x: 82, y: 155, w: 36, h: 42, r: 8, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          // Floating yellow Moon Balloon on a string
          { type: 'circle', x: 150, y: 45, r: 24, fill: '#FFD12A', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 142, y: 40, r: 4, fill: '#F39C12' },
          { type: 'line', x1: 118, y1: 165, x2: 150, y2: 70, stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'Jetpack Rocket Astronaut',
        strokes: [
          { type: 'circle', x: 100, y: 90, r: 40, fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          { type: 'oval', x: 100, y: 90, rx: 26, ry: 18, fill: '#3742FA', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 74, y: 132, w: 52, h: 60, r: 8, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          // Dual red jetpacks on back
          { type: 'rect', x: 50, y: 125, w: 20, h: 45, r: 4, fill: '#FF4757', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 130, y: 125, w: 20, h: 45, r: 4, fill: '#FF4757', stroke: '#1e1e2e', width: 3 },
          // Blast flames
          { type: 'path', points: [[54, 170], [60, 210], [66, 170]], fill: '#FFA502' },
          { type: 'path', points: [[134, 170], [140, 210], [146, 170]], fill: '#FFA502' }
        ]
      },
      {
        style: 'Alien Disguised as Astronaut',
        strokes: [
          { type: 'circle', x: 100, y: 95, r: 44, fill: '#F1F2F6', stroke: '#1e1e2e', width: 5 },
          // Clear glass visor with green alien face & 3 eyes
          { type: 'circle', x: 100, y: 95, r: 32, fill: '#2ED573', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 88, y: 92, r: 4, fill: '#1e1e2e' },
          { type: 'circle', x: 100, y: 85, r: 4, fill: '#1e1e2e' },
          { type: 'circle', x: 112, y: 92, r: 4, fill: '#1e1e2e' },
          // Two antennae sticking out helmet top
          { type: 'line', x1: 85, y1: 52, x2: 75, y2: 30, stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 75, y: 30, r: 6, fill: '#2ED573', stroke: '#1e1e2e', width: 2 },
          { type: 'line', x1: 115, y1: 52, x2: 125, y2: 30, stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 125, y: 30, r: 6, fill: '#2ED573', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 75, y: 142, w: 50, h: 60, r: 8, fill: '#9B59B6', stroke: '#1e1e2e', width: 4 }
        ]
      }
    ]
  },

  // 9. CUPCAKE
  {
    id: 'cupcake',
    name: 'Cupcake',
    emoji: '🧁',
    category: 'Food',
    variants: [
      {
        style: 'Classic Cherry Swirl',
        strokes: [
          { type: 'path', points: [[60, 140], [140, 140], [128, 225], [72, 225]], fill: '#FF7675', stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 78, y1: 140, x2: 84, y2: 225, stroke: '#1e1e2e', width: 3 },
          { type: 'line', x1: 100, y1: 140, x2: 100, y2: 225, stroke: '#1e1e2e', width: 3 },
          { type: 'line', x1: 122, y1: 140, x2: 116, y2: 225, stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 80, y: 130, r: 24, fill: '#55E6C1', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 120, y: 130, r: 24, fill: '#55E6C1', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 100, r: 30, fill: '#55E6C1', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 65, r: 14, fill: '#FF3838', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Unicorn Rainbow Cupcake',
        strokes: [
          // Pastel blue wrapper
          { type: 'path', points: [[62, 145], [138, 145], [125, 220], [75, 220]], fill: '#74B9FF', stroke: '#1e1e2e', width: 4 },
          // Pink swirl frosting
          { type: 'circle', x: 80, y: 130, r: 22, fill: '#FF9FF3', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 120, y: 130, r: 22, fill: '#FF9FF3', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 105, r: 28, fill: '#FF9FF3', stroke: '#1e1e2e', width: 4 },
          // Golden Unicorn Horn
          { type: 'path', points: [[94, 90], [100, 40], [106, 90]], fill: '#FFD12A', stroke: '#1e1e2e', width: 3 },
          // Cute unicorn ears
          { type: 'path', points: [[72, 95], [65, 75], [82, 88]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 3 },
          { type: 'path', points: [[128, 95], [135, 75], [118, 88]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Monster Googly-Eye Cupcake',
        strokes: [
          // Purple wrapper
          { type: 'path', points: [[60, 140], [140, 140], [128, 225], [72, 225]], fill: '#8854D0', stroke: '#1e1e2e', width: 5 },
          // Green fuzzy frosting
          { type: 'circle', x: 80, y: 125, r: 26, fill: '#2ED573', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 120, y: 125, r: 26, fill: '#2ED573', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 95, r: 32, fill: '#2ED573', stroke: '#1e1e2e', width: 4 },
          // 3 Googly eyes
          { type: 'circle', x: 78, y: 95, r: 10, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 80, y: 96, r: 4, fill: '#1e1e2e' },
          { type: 'circle', x: 122, y: 95, r: 10, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 120, y: 94, r: 4, fill: '#1e1e2e' },
          { type: 'circle', x: 100, y: 78, r: 12, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 101, y: 79, r: 5, fill: '#1e1e2e' }
        ]
      },
      {
        style: 'Chocolate Lava Cupcake',
        strokes: [
          // Gold foil wrapper
          { type: 'path', points: [[60, 140], [140, 140], [128, 225], [72, 225]], fill: '#F1C40F', stroke: '#1e1e2e', width: 5 },
          // Rich chocolate swirl
          { type: 'circle', x: 80, y: 130, r: 24, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 120, y: 130, r: 24, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 100, r: 30, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          // Dripping caramel drizzle
          { type: 'path', points: [[80, 95], [100, 120], [120, 95]], stroke: '#FFA502', width: 6, cap: 'round', fill: 'none' },
          // Wafer stick poking out
          { type: 'rect', x: 115, y: 50, w: 8, h: 55, r: 3, rot: 0.3, fill: '#D2B48C', stroke: '#1e1e2e', width: 2 }
        ]
      }
    ]
  },

  // 10. GUITAR
  {
    id: 'guitar',
    name: 'Guitar',
    emoji: '🎸',
    category: 'Music',
    variants: [
      {
        style: 'Classic Red Electric Rocker',
        strokes: [
          { type: 'circle', x: 80, y: 180, r: 38, fill: '#FF4757', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 105, y: 135, r: 28, fill: '#FF4757', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 92, y: 155, r: 12, fill: '#1e1e2e' },
          { type: 'line', x1: 115, y1: 120, x2: 165, y2: 45, stroke: '#F39C12', width: 12 },
          { type: 'line', x1: 115, y1: 120, x2: 165, y2: 45, stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 160, y: 35, w: 18, h: 22, r: 4, rot: -0.6, fill: '#FF4757', stroke: '#1e1e2e', width: 3 },
          { type: 'line', x1: 75, y1: 190, x2: 165, y2: 45, stroke: '#FFFFFF', width: 2 }
        ]
      },
      {
        style: 'Acoustic Wooden Folk Guitar',
        strokes: [
          { type: 'circle', x: 100, y: 175, r: 46, fill: '#E67E22', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 100, y: 120, r: 34, fill: '#E67E22', stroke: '#1e1e2e', width: 5 },
          // Sound hole with rosette ring
          { type: 'circle', x: 100, y: 140, r: 16, fill: '#1e1e2e', stroke: '#D35400', width: 4 },
          // Straight long neck
          { type: 'rect', x: 94, y: 40, w: 12, h: 80, fill: '#F39C12', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 90, y: 20, w: 20, h: 24, r: 4, fill: '#E67E22', stroke: '#1e1e2e', width: 3 },
          // Tuning pegs
          { type: 'circle', x: 86, y: 26, r: 3, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 86, y: 36, r: 3, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 114, y: 26, r: 3, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 114, y: 36, r: 3, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'Flying V Heavy Metal Axe',
        strokes: [
          // Sharp V Body
          { type: 'path', points: [[100, 130], [50, 220], [80, 205], [100, 160], [120, 205], [150, 220]], fill: '#1e1e2e', stroke: '#FF4757', width: 4 },
          // Pickguard
          { type: 'path', points: [[100, 140], [85, 175], [115, 175]], fill: '#FFFFFF' },
          // Long neck with lightning headstock
          { type: 'line', x1: 100, y1: 140, x2: 100, y2: 40, stroke: '#747D8C', width: 10 },
          { type: 'path', points: [[95, 40], [115, 20], [105, 40]], fill: '#1e1e2e', stroke: '#FF4757', width: 3 },
          // Flame bursts on bottom
          { type: 'path', points: [[45, 222], [40, 245], [55, 225]], fill: '#FFA502' },
          { type: 'path', points: [[145, 222], [150, 245], [155, 225]], fill: '#FFA502' }
        ]
      },
      {
        style: 'Cute Pastel Ukulele with Music Notes',
        strokes: [
          // Sky blue body
          { type: 'oval', x: 95, y: 165, rx: 36, ry: 48, fill: '#70A1FF', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 95, y: 150, r: 12, fill: '#1e1e2e' },
          { type: 'rect', x: 91, y: 55, w: 8, h: 65, fill: '#FFEAA7', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 87, y: 35, w: 16, h: 22, r: 4, fill: '#70A1FF', stroke: '#1e1e2e', width: 3 },
          // Floating musical notes
          { type: 'music_note', x: 145, y: 90, color: '#FF4757' },
          { type: 'music_note', x: 50, y: 110, color: '#2ED573' },
          { type: 'music_note', x: 150, y: 145, color: '#FFA502' }
        ]
      }
    ]
  },

  // 11. CUTE CAT
  {
    id: 'cute-cat',
    name: 'Cute Cat',
    emoji: '🐱',
    category: 'Animals',
    variants: [
      {
        style: 'Orange Tabby Cat',
        strokes: [
          { type: 'circle', x: 100, y: 130, r: 50, fill: '#FFA502', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[62, 95], [50, 45], [85, 82]], fill: '#FF7675', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[138, 95], [150, 45], [115, 82]], fill: '#FF7675', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 80, y: 125, r: 7, fill: '#1e1e2e' },
          { type: 'circle', x: 78, y: 122, r: 2.5, fill: '#FFFFFF' },
          { type: 'circle', x: 120, y: 125, r: 7, fill: '#1e1e2e' },
          { type: 'circle', x: 118, y: 122, r: 2.5, fill: '#FFFFFF' },
          { type: 'path', points: [[95, 138], [105, 138], [100, 144]], fill: '#FF4757' },
          { type: 'whiskers', cx: 100, cy: 140 }
        ]
      },
      {
        style: 'Lucky Calico Neko with Waving Paw',
        strokes: [
          // White round kitty with calico patch
          { type: 'circle', x: 95, y: 135, r: 48, fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          { type: 'arc', x: 85, y: 110, r: 25, start: 3.5, end: 5.5, fill: '#E67E22' },
          { type: 'path', points: [[60, 100], [48, 55], [82, 90]], fill: '#FF7675', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[130, 100], [142, 55], [110, 90]], fill: '#1e1e2e', stroke: '#1e1e2e', width: 4 },
          // Happy smiling slit eyes ^_^
          { type: 'arc', x: 78, y: 126, r: 8, start: Math.PI, end: 0, stroke: '#1e1e2e', width: 3 },
          { type: 'arc', x: 114, y: 126, r: 8, start: Math.PI, end: 0, stroke: '#1e1e2e', width: 3 },
          // Red collar with gold bell
          { type: 'rect', x: 75, y: 175, w: 42, h: 8, r: 3, fill: '#FF4757', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 95, y: 186, r: 6, fill: '#FFD12A', stroke: '#1e1e2e', width: 2 },
          // Raised waving paw
          { type: 'circle', x: 145, y: 130, r: 14, fill: '#FFFFFF', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Black Cat with Witch Hat',
        strokes: [
          { type: 'circle', x: 100, y: 140, r: 46, fill: '#1e1e2e', stroke: '#1e1e2e', width: 4 },
          // Glowing yellow cat eyes
          { type: 'circle', x: 82, y: 135, r: 8, fill: '#FFD12A' },
          { type: 'circle', x: 82, y: 135, r: 4, fill: '#1e1e2e' },
          { type: 'circle', x: 118, y: 135, r: 8, fill: '#FFD12A' },
          { type: 'circle', x: 118, y: 135, r: 4, fill: '#1e1e2e' },
          // Purple Witch Hat
          { type: 'oval', x: 100, y: 100, rx: 50, ry: 14, fill: '#8854D0', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[75, 100], [100, 35], [125, 100]], fill: '#8854D0', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 80, y: 92, w: 40, h: 8, fill: '#FFA502' }
        ]
      },
      {
        style: 'Fluffy Kitten Playing with Yarn',
        strokes: [
          { type: 'circle', x: 85, y: 120, r: 42, fill: '#DFE4EA', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[55, 90], [45, 55], [75, 80]], fill: '#FF9FF3', stroke: '#1e1e2e', width: 3 },
          { type: 'path', points: [[115, 90], [125, 55], [95, 80]], fill: '#FF9FF3', stroke: '#1e1e2e', width: 3 },
          // Big playful eyes
          { type: 'circle', x: 74, y: 115, r: 7, fill: '#1e1e2e' },
          { type: 'circle', x: 102, y: 115, r: 7, fill: '#1e1e2e' },
          // Big ball of red yarn
          { type: 'circle', x: 145, y: 175, r: 25, fill: '#FF4757', stroke: '#1e1e2e', width: 4 },
          // Yarn string loops
          { type: 'arc', x: 115, y: 155, r: 20, start: 0.5, end: 3.5, stroke: '#FF4757', width: 3 }
        ]
      }
    ]
  },

  // 12. ICE CREAM CONE
  {
    id: 'ice-cream',
    name: 'Ice Cream Cone',
    emoji: '🍦',
    category: 'Food',
    variants: [
      {
        style: 'Triple Scoop Rainbow',
        strokes: [
          { type: 'path', points: [[70, 140], [130, 140], [100, 240]], fill: '#F39C12', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 100, y: 135, r: 34, fill: '#55E6C1', stroke: '#1e1e2e', width: 4 }, // mint scoop
          { type: 'circle', x: 100, y: 95, r: 32, fill: '#FF9FF3', stroke: '#1e1e2e', width: 4 }, // strawberry
          { type: 'circle', x: 100, y: 55, r: 28, fill: '#FFD12A', stroke: '#1e1e2e', width: 4 }, // mango
          { type: 'circle', x: 100, y: 25, r: 10, fill: '#FF3838', stroke: '#1e1e2e', width: 2 } // cherry
        ]
      },
      {
        style: 'Cute Soft-Serve Swirl with Face',
        strokes: [
          // Waffle cone with crosshatch
          { type: 'path', points: [[72, 130], [128, 130], [100, 235]], fill: '#E67E22', stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 82, y1: 150, x2: 118, y2: 150, stroke: '#D35400', width: 2 },
          { type: 'line', x1: 88, y1: 180, x2: 112, y2: 180, stroke: '#D35400', width: 2 },
          // Swirly vanilla soft-serve
          { type: 'circle', x: 100, y: 115, r: 35, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 80, r: 26, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 100, y: 52, r: 16, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          // Cute face on bottom swirl
          { type: 'circle', x: 88, y: 115, r: 4, fill: '#1e1e2e' },
          { type: 'circle', x: 112, y: 115, r: 4, fill: '#1e1e2e' },
          { type: 'arc', x: 100, y: 122, r: 6, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 82, y: 122, r: 4, fill: '#FF7675' },
          { type: 'circle', x: 118, y: 122, r: 4, fill: '#FF7675' }
        ]
      },
      {
        style: 'Dipped Chocolate Fudge Cone',
        strokes: [
          { type: 'path', points: [[70, 130], [130, 130], [100, 235]], fill: '#F39C12', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 100, y: 100, r: 40, fill: '#FF9FF3', stroke: '#1e1e2e', width: 4 },
          // Thick chocolate shell cap
          { type: 'arc', x: 100, y: 92, r: 40, start: 3.14, end: 0, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          // Dripping chocolate drops
          { type: 'path', points: [[65, 92], [70, 120], [75, 92]], fill: '#5D4037' },
          { type: 'path', points: [[95, 92], [100, 125], [105, 92]], fill: '#5D4037' },
          { type: 'path', points: [[125, 92], [130, 115], [135, 92]], fill: '#5D4037' }
        ]
      },
      {
        style: 'Popsicle Bar with Bite Mark',
        strokes: [
          // Wooden popsicle stick
          { type: 'rect', x: 92, y: 170, w: 16, h: 65, r: 8, fill: '#F5CD79', stroke: '#1e1e2e', width: 4 },
          // Rounded rectangular ice pop
          { type: 'rect', x: 65, y: 50, w: 70, h: 125, r: 24, fill: '#FF4757', stroke: '#1e1e2e', width: 5 },
          // Contrast bottom flavor dip
          { type: 'rect', x: 65, y: 130, w: 70, h: 45, r: 6, fill: '#FFD12A', stroke: '#1e1e2e', width: 3 },
          // Bite mark taken out of top-right
          { type: 'circle', x: 135, y: 65, r: 16, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 }
        ]
      }
    ]
  },

  // 13. CHEESEBURGER
  {
    id: 'burger',
    name: 'Cheeseburger',
    emoji: '🍔',
    category: 'Food',
    variants: [
      {
        style: 'Classic Loaded Burger',
        strokes: [
          { type: 'arc', x: 100, y: 90, r: 50, start: 3.14, end: 0, fill: '#F39C12', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 50, y: 92, w: 100, h: 14, r: 6, fill: '#2ED573', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 54, y: 108, w: 92, h: 10, r: 3, fill: '#FF4757', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 48, y: 120, w: 104, h: 12, r: 2, fill: '#FED330', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 46, y: 134, w: 108, h: 22, r: 10, fill: '#833471', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 52, y: 158, w: 96, h: 24, r: 10, fill: '#F39C12', stroke: '#1e1e2e', width: 5 }
        ]
      },
      {
        style: 'Cute Kawaii Burger',
        strokes: [
          { type: 'arc', x: 100, y: 95, r: 46, start: 3.14, end: 0, fill: '#FFA502', stroke: '#1e1e2e', width: 5 },
          // Cute anime face on top bun
          { type: 'circle', x: 82, y: 75, r: 6, fill: '#1e1e2e' },
          { type: 'circle', x: 80, y: 73, r: 2, fill: '#FFFFFF' },
          { type: 'circle', x: 118, y: 75, r: 6, fill: '#1e1e2e' },
          { type: 'circle', x: 116, y: 73, r: 2, fill: '#FFFFFF' },
          { type: 'arc', x: 100, y: 82, r: 6, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 74, y: 82, r: 5, fill: '#FF7675' },
          { type: 'circle', x: 126, y: 82, r: 5, fill: '#FF7675' },
          // Melted cheese corners
          { type: 'path', points: [[60, 115], [75, 135], [90, 115]], fill: '#FFD12A' },
          { type: 'rect', x: 50, y: 125, w: 100, h: 18, r: 8, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 54, y: 145, w: 92, h: 22, r: 8, fill: '#FFA502', stroke: '#1e1e2e', width: 4 }
        ]
      },
      {
        style: 'Monster Double-Decker',
        strokes: [
          // Top bun with toothpick flag
          { type: 'arc', x: 100, y: 70, r: 48, start: 3.14, end: 0, fill: '#F39C12', stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 100, y1: 22, x2: 100, y2: 60, stroke: '#1e1e2e', width: 3 },
          { type: 'path', points: [[100, 22], [125, 30], [100, 38]], fill: '#FF4757', stroke: '#1e1e2e', width: 2 },
          // Patty 1
          { type: 'rect', x: 50, y: 80, w: 100, h: 18, r: 8, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          // Middle bun
          { type: 'rect', x: 52, y: 102, w: 96, h: 14, r: 6, fill: '#F39C12', stroke: '#1e1e2e', width: 4 },
          // Patty 2 + Cheese
          { type: 'rect', x: 48, y: 120, w: 104, h: 12, fill: '#FFD12A', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 50, y: 135, w: 100, h: 18, r: 8, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          // Bottom bun
          { type: 'rect', x: 52, y: 156, w: 96, h: 22, r: 8, fill: '#F39C12', stroke: '#1e1e2e', width: 4 }
        ]
      },
      {
        style: 'Burger with French Fries Meal',
        strokes: [
          { type: 'arc', x: 80, y: 120, r: 38, start: 3.14, end: 0, fill: '#F39C12', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 42, y: 132, w: 76, h: 16, r: 6, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 46, y: 150, w: 68, h: 18, r: 6, fill: '#F39C12', stroke: '#1e1e2e', width: 4 },
          // Red fries box on right
          { type: 'path', points: [[125, 120], [165, 120], [160, 175], [130, 175]], fill: '#FF4757', stroke: '#1e1e2e', width: 4 },
          // Golden fries sticking out
          { type: 'rect', x: 130, y: 80, w: 7, h: 42, fill: '#FFD12A', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 140, y: 72, w: 7, h: 50, fill: '#FFD12A', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 150, y: 78, w: 7, h: 44, fill: '#FFD12A', stroke: '#1e1e2e', width: 2 }
        ]
      }
    ]
  },

  // 14. DINOSAUR
  {
    id: 'dinosaur',
    name: 'Cute Dinosaur',
    emoji: '🦖',
    category: 'Animals',
    variants: [
      {
        style: 'Baby T-Rex',
        strokes: [
          { type: 'oval', x: 90, y: 145, rx: 42, ry: 50, rot: -0.1, fill: '#2ED573', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 130, y: 90, r: 30, fill: '#2ED573', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 140, y: 82, r: 6, fill: '#1e1e2e' },
          { type: 'circle', x: 139, y: 80, r: 2, fill: '#FFFFFF' },
          { type: 'path', points: [[50, 160], [20, 195], [60, 185]], fill: '#2ED573', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 70, y: 190, w: 16, h: 30, r: 6, fill: '#26AF61', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 95, y: 190, w: 16, h: 30, r: 6, fill: '#26AF61', stroke: '#1e1e2e', width: 4 },
          { type: 'spikes', cx: 90, cy: 110 }
        ]
      },
      {
        style: 'Long-Neck Brachiosaurus',
        strokes: [
          // Round plump body
          { type: 'oval', x: 80, y: 165, rx: 50, ry: 38, fill: '#70A1FF', stroke: '#1e1e2e', width: 5 },
          // Long curving neck
          { type: 'path', points: [[115, 155], [135, 75], [145, 45]], stroke: '#70A1FF', width: 22, cap: 'round', fill: 'none' },
          { type: 'path', points: [[115, 155], [135, 75], [145, 45]], stroke: '#1e1e2e', width: 5, cap: 'round', fill: 'none' },
          // Small head munching a leaf
          { type: 'circle', x: 145, y: 45, r: 16, fill: '#70A1FF', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 148, y: 42, r: 3, fill: '#1e1e2e' },
          { type: 'leaf', x: 160, y: 48, angle: 0.5, color: '#2ED573' },
          // 4 pillar legs
          { type: 'rect', x: 45, y: 195, w: 14, h: 25, r: 4, fill: '#54A0FF', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 70, y: 195, w: 14, h: 25, r: 4, fill: '#54A0FF', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 95, y: 195, w: 14, h: 25, r: 4, fill: '#54A0FF', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Fierce Triceratops with 3 Horns',
        strokes: [
          { type: 'oval', x: 85, y: 155, rx: 45, ry: 38, fill: '#FFA502', stroke: '#1e1e2e', width: 5 },
          // Large head frill shield
          { type: 'circle', x: 130, y: 120, r: 36, fill: '#E67E22', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 138, y: 130, r: 24, fill: '#FFA502', stroke: '#1e1e2e', width: 4 },
          // 3 White horns
          { type: 'path', points: [[155, 130], [178, 128], [155, 136]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 }, // nose horn
          { type: 'path', points: [[138, 105], [162, 85], [144, 110]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 }, // brow horn
          { type: 'path', points: [[125, 100], [148, 78], [131, 105]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 140, y: 124, r: 4, fill: '#1e1e2e' }
        ]
      },
      {
        style: 'Dino Hatching from Egg',
        strokes: [
          // Cracked white egg bottom
          { type: 'path', points: [[45, 160], [60, 140], [80, 160], [100, 135], [120, 160], [140, 140], [155, 160], [145, 230], [55, 230]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          // Purple baby dino poking out
          { type: 'circle', x: 100, y: 120, r: 36, fill: '#9B59B6', stroke: '#1e1e2e', width: 4 },
          { type: 'circle', x: 88, y: 115, r: 7, fill: '#1e1e2e' },
          { type: 'circle', x: 86, y: 113, r: 2.5, fill: '#FFFFFF' },
          { type: 'circle', x: 112, y: 115, r: 7, fill: '#1e1e2e' },
          { type: 'circle', x: 110, y: 113, r: 2.5, fill: '#FFFFFF' },
          // Egg shell hat on head
          { type: 'path', points: [[75, 95], [100, 65], [125, 95], [110, 88], [95, 95]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 3 }
        ]
      }
    ]
  },

  // 15. GLAZED DONUT
  {
    id: 'donut',
    name: 'Glazed Donut',
    emoji: '🍩',
    category: 'Food',
    variants: [
      {
        style: 'Strawberry Pink with Confetti',
        strokes: [
          { type: 'circle', x: 100, y: 130, r: 62, fill: '#F39C12', stroke: '#1e1e2e', width: 6 },
          { type: 'circle', x: 100, y: 130, r: 22, fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          { type: 'donutIcing', cx: 100, cy: 130, r: 54, fill: '#FF69B4', stroke: '#1e1e2e' },
          { type: 'sprinkles', cx: 100, cy: 130, count: 18, radius: 42 }
        ]
      },
      {
        style: 'Rich Chocolate Fudge with Caramel',
        strokes: [
          { type: 'circle', x: 100, y: 130, r: 60, fill: '#E67E22', stroke: '#1e1e2e', width: 6 },
          { type: 'circle', x: 100, y: 130, r: 20, fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          { type: 'donutIcing', cx: 100, cy: 130, r: 52, fill: '#5D4037', stroke: '#1e1e2e' },
          // Caramel drizzle zigzags
          { type: 'arc', x: 100, y: 130, r: 38, start: 0.2, end: 2.8, stroke: '#FFA502', width: 4 },
          { type: 'arc', x: 100, y: 130, r: 44, start: 3.4, end: 5.9, stroke: '#FFA502', width: 4 }
        ]
      },
      {
        style: 'Cute Smiling Donut with a Bite',
        strokes: [
          { type: 'circle', x: 100, y: 130, r: 58, fill: '#F1C40F', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 100, y: 130, r: 18, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          { type: 'donutIcing', cx: 100, cy: 130, r: 50, fill: '#55E6C1', stroke: '#1e1e2e' },
          // Cute smiley face
          { type: 'circle', x: 88, y: 130, r: 5, fill: '#1e1e2e' },
          { type: 'circle', x: 112, y: 130, r: 5, fill: '#1e1e2e' },
          { type: 'arc', x: 100, y: 140, r: 8, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 2 },
          // Big cartoon bite taken out of right side
          { type: 'circle', x: 155, y: 125, r: 22, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 }
        ]
      },
      {
        style: 'Galaxy Purple Space Donut',
        strokes: [
          { type: 'circle', x: 100, y: 130, r: 60, fill: '#2C3E50', stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 100, y: 130, r: 20, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          { type: 'donutIcing', cx: 100, cy: 130, r: 52, fill: '#8854D0', stroke: '#1e1e2e' },
          // White star sparkles
          { type: 'star', x: 75, y: 105, size: 8, color: '#FFFFFF' },
          { type: 'star', x: 125, y: 110, size: 6, color: '#FFFFFF' },
          { type: 'star', x: 100, y: 165, size: 7, color: '#FFFFFF' },
          { type: 'star', x: 65, y: 145, size: 5, color: '#70A1FF' }
        ]
      }
    ]
  },

  // 16. CARTOON ROBOT
  {
    id: 'robot',
    name: 'Cartoon Robot',
    emoji: '🤖',
    category: 'Sci-Fi',
    variants: [
      {
        style: 'Retro Blue Bot',
        strokes: [
          { type: 'rect', x: 65, y: 70, w: 70, h: 55, r: 8, fill: '#70A1FF', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 60, y: 135, w: 80, h: 65, r: 10, fill: '#1E90FF', stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 100, y1: 70, x2: 100, y2: 45, stroke: '#1e1e2e', width: 5 },
          { type: 'circle', x: 100, y: 40, r: 8, fill: '#FF4757', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 83, y: 92, r: 8, fill: '#FFE066', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 117, y: 92, r: 8, fill: '#FFE066', stroke: '#1e1e2e', width: 3 },
          { type: 'rect', x: 80, y: 112, w: 40, h: 6, r: 2, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'circle', x: 100, y: 165, r: 14, fill: '#2ED573', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Cute Kawaii Floating Orb-Bot',
        strokes: [
          // Spherical head & body
          { type: 'circle', x: 100, y: 120, r: 52, fill: '#F1F2F6', stroke: '#1e1e2e', width: 5 },
          // Black screen visor with cyan happy digital eyes
          { type: 'rect', x: 65, y: 95, w: 70, h: 36, r: 12, fill: '#1e1e2e', stroke: '#1e1e2e', width: 2 },
          { type: 'arc', x: 85, y: 112, r: 7, start: Math.PI, end: 0, stroke: '#00D2D3', width: 4 },
          { type: 'arc', x: 115, y: 112, r: 7, start: Math.PI, end: 0, stroke: '#00D2D3', width: 4 },
          // Floating magnetic hands
          { type: 'circle', x: 38, y: 130, r: 12, fill: '#70A1FF', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 162, y: 130, r: 12, fill: '#70A1FF', stroke: '#1e1e2e', width: 3 },
          // Little propeller on head
          { type: 'line', x1: 100, y1: 68, x2: 100, y2: 52, stroke: '#1e1e2e', width: 3 },
          { type: 'oval', x: 100, y: 52, rx: 25, ry: 4, fill: '#FFA502', stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'Battle Mech Droid with Laser Cannon',
        strokes: [
          // Heavy angular chassis
          { type: 'rect', x: 62, y: 65, w: 76, h: 50, r: 4, fill: '#2F3542', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 55, y: 125, w: 90, h: 70, r: 6, fill: '#2F3542', stroke: '#1e1e2e', width: 5 },
          // Single glowing red Cylon scanner eye
          { type: 'rect', x: 75, y: 85, w: 50, h: 10, r: 2, fill: '#FF4757', stroke: '#1e1e2e', width: 2 },
          // Shoulder laser blaster
          { type: 'rect', x: 145, y: 115, w: 32, h: 14, r: 3, fill: '#E74C3C', stroke: '#1e1e2e', width: 3 },
          // Laser beam
          { type: 'line', x1: 177, y1: 122, x2: 200, y2: 122, stroke: '#FF4757', width: 4 }
        ]
      },
      {
        style: 'Steampunk Clockwork Brass Bot',
        strokes: [
          // Brass bronze torso
          { type: 'circle', x: 100, y: 90, r: 36, fill: '#CD853F', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 68, y: 130, w: 64, h: 65, r: 8, fill: '#CD853F', stroke: '#1e1e2e', width: 5 },
          // Clock face on chest
          { type: 'circle', x: 100, y: 160, r: 20, fill: '#FFF8DC', stroke: '#1e1e2e', width: 3 },
          { type: 'line', x1: 100, y1: 160, x2: 100, y2: 146, stroke: '#1e1e2e', width: 2 },
          { type: 'line', x1: 100, y1: 160, x2: 112, y2: 160, stroke: '#1e1e2e', width: 2 },
          // Big brass winding key on back
          { type: 'circle', x: 52, y: 155, r: 10, fill: '#FFD12A', stroke: '#1e1e2e', width: 3 }
        ]
      }
    ]
  },

  // 17. COFFEE MUG
  {
    id: 'coffee-mug',
    name: 'Coffee Mug',
    emoji: '☕',
    category: 'Everyday',
    variants: [
      {
        style: 'Latte Art Heart Mug',
        strokes: [
          { type: 'rect', x: 55, y: 100, w: 75, h: 85, r: 12, fill: '#70A1FF', stroke: '#1e1e2e', width: 5 },
          // Curved handle on right
          { type: 'arc', x: 130, y: 142, r: 24, start: -Math.PI * 0.45, end: Math.PI * 0.45, stroke: '#1e1e2e', width: 8 },
          { type: 'oval', x: 92, y: 100, rx: 37, ry: 14, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          // White heart foam art
          { type: 'heart', x: 92, y: 98, size: 10, fill: '#FFFFFF' },
          // Steam swirls
          { type: 'arc', x: 80, y: 65, r: 14, start: 0, end: Math.PI, stroke: '#DFE4EA', width: 3 },
          { type: 'arc', x: 105, y: 55, r: 14, start: 0, end: Math.PI, stroke: '#DFE4EA', width: 3 }
        ]
      },
      {
        style: 'Takeout Cup with Sleeve',
        strokes: [
          // White tapered cup
          { type: 'path', points: [[62, 80], [138, 80], [125, 210], [75, 210]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          // Brown cardboard sleeve with circle logo
          { type: 'rect', x: 67, y: 120, w: 66, h: 45, fill: '#D2B48C', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 100, y: 142, r: 14, fill: '#2ED573', stroke: '#1e1e2e', width: 2 },
          // Green drinking straw
          { type: 'line', x1: 100, y1: 80, x2: 120, y2: 30, stroke: '#2ED573', width: 6 },
          // Lid
          { type: 'rect', x: 58, y: 72, w: 84, h: 12, r: 4, fill: '#2C3E50', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Cute Kawaii Kitty Mug',
        strokes: [
          { type: 'rect', x: 60, y: 105, w: 80, h: 80, r: 16, fill: '#FF9FF3', stroke: '#1e1e2e', width: 5 },
          // Cat ears on top rim
          { type: 'path', points: [[66, 105], [74, 85], [84, 105]], fill: '#FF9FF3', stroke: '#1e1e2e', width: 3 },
          { type: 'path', points: [[116, 105], [126, 85], [134, 105]], fill: '#FF9FF3', stroke: '#1e1e2e', width: 3 },
          // Handle
          { type: 'arc', x: 140, y: 145, r: 20, start: -Math.PI * 0.45, end: Math.PI * 0.45, stroke: '#1e1e2e', width: 6 },
          // Sleeping cute cat face
          { type: 'arc', x: 85, y: 140, r: 6, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 2.5 },
          { type: 'arc', x: 115, y: 140, r: 6, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 2.5 },
          { type: 'circle', x: 74, y: 148, r: 5, fill: '#FF7675' },
          { type: 'circle', x: 126, y: 148, r: 5, fill: '#FF7675' }
        ]
      },
      {
        style: 'Iced Frappe with Whipped Cream',
        strokes: [
          // Clear cup
          { type: 'path', points: [[65, 95], [135, 95], [122, 215], [78, 215]], fill: '#F5CD79', stroke: '#1e1e2e', width: 5 },
          // Floating ice cubes
          { type: 'rect', x: 80, y: 125, w: 18, h: 18, r: 3, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 105, y: 155, w: 18, h: 18, r: 3, fill: '#FFFFFF', stroke: '#1e1e2e', width: 2 },
          // Giant dome of whipped cream
          { type: 'circle', x: 100, y: 80, r: 36, fill: '#FFFFFF', stroke: '#1e1e2e', width: 4 },
          // Red cherry on top
          { type: 'circle', x: 100, y: 45, r: 10, fill: '#FF4757', stroke: '#1e1e2e', width: 2 }
        ]
      }
    ]
  },

  // 18. CAMPFIRE
  {
    id: 'campfire',
    name: 'Campfire',
    emoji: '🔥',
    category: 'Nature',
    variants: [
      {
        style: 'Classic Log Fire',
        strokes: [
          // Crossed wooden logs
          { type: 'rect', x: 45, y: 195, w: 110, h: 18, r: 8, rot: 0.2, fill: '#833471', stroke: '#1e1e2e', width: 4 },
          { type: 'rect', x: 45, y: 195, w: 110, h: 18, r: 8, rot: -0.2, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          // Big outer red flame
          { type: 'path', points: [[70, 200], [45, 130], [80, 110], [100, 45], [120, 110], [155, 130], [130, 200]], fill: '#FF4757', stroke: '#1e1e2e', width: 4 },
          // Inner orange flame
          { type: 'path', points: [[80, 200], [65, 150], [90, 130], [100, 85], [110, 130], [135, 150], [120, 200]], fill: '#FFA502' },
          // Center bright yellow flame
          { type: 'path', points: [[90, 200], [100, 120], [110, 200]], fill: '#FFD12A' }
        ]
      },
      {
        style: 'Toasting Marshmallow on a Stick',
        strokes: [
          // Fire base
          { type: 'rect', x: 50, y: 200, w: 100, h: 16, r: 6, fill: '#5D4037', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[75, 200], [60, 150], [100, 80], [140, 150], [125, 200]], fill: '#FF4757', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[85, 200], [100, 120], [115, 200]], fill: '#FFD12A' },
          // Long wooden stick roasting marshmallow
          { type: 'line', x1: 20, y1: 50, x2: 120, y2: 120, stroke: '#5D4037', width: 5 },
          // Toasty golden marshmallow on end of stick
          { type: 'rect', x: 95, y: 100, w: 22, h: 28, r: 6, rot: 0.6, fill: '#FFF8DC', stroke: '#1e1e2e', width: 3 },
          { type: 'oval', x: 102, y: 108, rx: 6, ry: 4, rot: 0.6, fill: '#D35400' } // toasty brown spot
        ]
      },
      {
        style: 'Cute Smiling Kawaii Flame',
        strokes: [
          { type: 'rect', x: 60, y: 205, w: 80, h: 16, r: 8, fill: '#5D4037', stroke: '#1e1e2e', width: 3 },
          // Chubby smiling flame
          { type: 'path', points: [[65, 200], [50, 140], [100, 55], [150, 140], [135, 200]], fill: '#FF6B6B', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[75, 200], [70, 160], [100, 100], [130, 160], [125, 200]], fill: '#FFD12A' },
          // Big smiling eyes
          { type: 'circle', x: 86, y: 152, r: 6, fill: '#1e1e2e' },
          { type: 'circle', x: 114, y: 152, r: 6, fill: '#1e1e2e' },
          { type: 'arc', x: 100, y: 162, r: 8, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 76, y: 162, r: 5, fill: '#FF4757' },
          { type: 'circle', x: 124, y: 162, r: 5, fill: '#FF4757' }
        ]
      },
      {
        style: 'Night Camp with Tent & Moon',
        strokes: [
          // Blue triangle tent on left
          { type: 'path', points: [[20, 210], [60, 130], [100, 210]], fill: '#3742FA', stroke: '#1e1e2e', width: 4 },
          { type: 'path', points: [[50, 210], [60, 150], [70, 210]], fill: '#1e1e2e' }, // tent opening
          // Small campfire on right
          { type: 'path', points: [[125, 210], [115, 175], [135, 140], [155, 175], [145, 210]], fill: '#FF4757', stroke: '#1e1e2e', width: 3 },
          { type: 'path', points: [[130, 210], [135, 165], [140, 210]], fill: '#FFD12A' },
          // Crescent moon in night sky
          { type: 'circle', x: 150, y: 55, r: 18, fill: '#FFD12A' },
          { type: 'circle', x: 156, y: 50, r: 16, fill: '#FFFFFF' }
        ]
      }
    ]
  },

  // 19. HOT AIR BALLOON
  {
    id: 'hot-air-balloon',
    name: 'Hot Air Balloon',
    emoji: '🎈',
    category: 'Vehicle',
    variants: [
      {
        style: 'Rainbow Striped Balloon',
        strokes: [
          // Huge teardrop balloon
          { type: 'circle', x: 100, y: 100, r: 60, fill: '#FF4757', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[50, 120], [80, 170], [120, 170], [150, 120]], fill: '#FF4757', stroke: '#1e1e2e', width: 4 },
          // Colorful vertical stripes
          { type: 'oval', x: 100, y: 100, rx: 32, ry: 60, fill: '#FFD12A', stroke: '#1e1e2e', width: 3 },
          { type: 'oval', x: 100, y: 100, rx: 14, ry: 60, fill: '#2ED573', stroke: '#1e1e2e', width: 3 },
          // Ropes to basket
          { type: 'line', x1: 82, y1: 170, x2: 86, y2: 200, stroke: '#1e1e2e', width: 2 },
          { type: 'line', x1: 118, y1: 170, x2: 114, y2: 200, stroke: '#1e1e2e', width: 2 },
          // Wicker basket
          { type: 'rect', x: 84, y: 200, w: 32, h: 24, r: 4, fill: '#E67E22', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Pastel Cloud Dream Balloon',
        strokes: [
          { type: 'circle', x: 100, y: 95, r: 56, fill: '#70A1FF', stroke: '#1e1e2e', width: 5 },
          { type: 'path', points: [[55, 115], [82, 165], [118, 165], [145, 115]], fill: '#70A1FF', stroke: '#1e1e2e', width: 4 },
          // White fluffy cloud across middle
          { type: 'circle', x: 80, y: 100, r: 18, fill: '#FFFFFF' },
          { type: 'circle', x: 100, y: 92, r: 22, fill: '#FFFFFF' },
          { type: 'circle', x: 120, y: 100, r: 18, fill: '#FFFFFF' },
          // Pink basket
          { type: 'line', x1: 85, y1: 165, x2: 88, y2: 195, stroke: '#1e1e2e', width: 2 },
          { type: 'line', x1: 115, y1: 165, x2: 112, y2: 195, stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 86, y: 195, w: 28, h: 22, r: 4, fill: '#FF9FF3', stroke: '#1e1e2e', width: 3 }
        ]
      },
      {
        style: 'Giant Red Heart Balloon',
        strokes: [
          { type: 'heart', x: 100, y: 90, size: 55, fill: '#FF4757', stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 82, y1: 165, x2: 86, y2: 198, stroke: '#1e1e2e', width: 2 },
          { type: 'line', x1: 118, y1: 165, x2: 114, y2: 198, stroke: '#1e1e2e', width: 2 },
          { type: 'rect', x: 85, y: 198, w: 30, h: 22, r: 4, fill: '#F5CD79', stroke: '#1e1e2e', width: 3 },
          { type: 'star', x: 75, y: 80, size: 6, color: '#FFFFFF' }
        ]
      },
      {
        style: 'Steampunk Flying Airship',
        strokes: [
          // Horizontal brass zeppelin balloon
          { type: 'oval', x: 100, y: 95, rx: 65, ry: 40, fill: '#FFA502', stroke: '#1e1e2e', width: 5 },
          { type: 'line', x1: 35, y1: 95, x2: 165, y2: 95, stroke: '#1e1e2e', width: 3 },
          // Rear propeller
          { type: 'rect', x: 25, y: 85, w: 8, h: 20, r: 2, fill: '#747D8C', stroke: '#1e1e2e', width: 2 },
          // Hanging gondola with windows
          { type: 'rect', x: 70, y: 145, w: 60, h: 25, r: 8, fill: '#2F3542', stroke: '#1e1e2e', width: 3 },
          { type: 'circle', x: 85, y: 157, r: 4, fill: '#00D2D3' },
          { type: 'circle', x: 100, y: 157, r: 4, fill: '#00D2D3' },
          { type: 'circle', x: 115, y: 157, r: 4, fill: '#00D2D3' }
        ]
      }
    ]
  },

  // 20. LIGHTHOUSE
  {
    id: 'lighthouse',
    name: 'Lighthouse',
    emoji: '🏮',
    category: 'Architecture',
    variants: [
      {
        style: 'Classic Red & White Beacon',
        strokes: [
          // Rocky island base
          { type: 'oval', x: 100, y: 220, rx: 65, ry: 18, fill: '#747D8C', stroke: '#1e1e2e', width: 4 },
          // Tapered tower
          { type: 'path', points: [[82, 85], [118, 85], [128, 215], [72, 215]], fill: '#FFFFFF', stroke: '#1e1e2e', width: 5 },
          // Red stripes
          { type: 'path', points: [[80, 115], [120, 115], [123, 145], [77, 145]], fill: '#FF4757' },
          { type: 'path', points: [[75, 175], [125, 175], [127, 200], [73, 200]], fill: '#FF4757' },
          // Glass lamp room
          { type: 'rect', x: 80, y: 55, w: 40, h: 30, r: 4, fill: '#FFD12A', stroke: '#1e1e2e', width: 3 },
          // Glowing light beam cutting right
          { type: 'path', points: [[120, 70], [195, 45], [195, 95]], fill: 'rgba(255, 209, 42, 0.45)' }
        ]
      },
      {
        style: 'Sunset Coastal Beacon',
        strokes: [
          // Purple sunset sky circle
          { type: 'circle', x: 100, y: 120, r: 65, fill: '#FFA502' },
          // Ocean waves at bottom
          { type: 'rect', x: 35, y: 175, w: 130, h: 45, fill: '#3742FA' },
          // Dark silhouette tower on cliff
          { type: 'path', points: [[90, 75], [110, 75], [116, 175], [84, 175]], fill: '#1e1e2e' },
          { type: 'rect', x: 86, y: 58, w: 28, h: 18, fill: '#FFD12A' }
        ]
      },
      {
        style: 'Cute Cartoon Lighthouse with Birds',
        strokes: [
          // Chubby smiling tower
          { type: 'path', points: [[75, 95], [125, 95], [132, 210], [68, 210]], fill: '#70A1FF', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 74, y: 65, w: 52, h: 30, r: 6, fill: '#FFD12A', stroke: '#1e1e2e', width: 3 },
          // Happy smiling face on tower
          { type: 'circle', x: 88, y: 140, r: 5, fill: '#1e1e2e' },
          { type: 'circle', x: 112, y: 140, r: 5, fill: '#1e1e2e' },
          { type: 'arc', x: 100, y: 152, r: 8, start: 0, end: Math.PI, stroke: '#1e1e2e', width: 2.5 },
          // Flying seagull checkmarks
          { type: 'arc', x: 50, y: 65, r: 8, start: Math.PI, end: 0, stroke: '#1e1e2e', width: 2 },
          { type: 'arc', x: 64, y: 65, r: 8, start: Math.PI, end: 0, stroke: '#1e1e2e', width: 2 },
          { type: 'arc', x: 150, y: 80, r: 6, start: Math.PI, end: 0, stroke: '#1e1e2e', width: 2 },
          { type: 'arc', x: 160, y: 80, r: 6, start: Math.PI, end: 0, stroke: '#1e1e2e', width: 2 }
        ]
      },
      {
        style: 'Stormy Night Seas with Lightning',
        strokes: [
          // Jagged yellow lightning bolt
          { type: 'path', points: [[55, 30], [45, 75], [60, 75], [40, 120]], stroke: '#FFD12A', width: 4, cap: 'round', fill: 'none' },
          // Dark stormy waves
          { type: 'wave', y: 205, color: '#1e1e2e' },
          { type: 'wave', y: 220, color: '#2F3542' },
          // Tall sturdy granite beacon
          { type: 'path', points: [[90, 80], [120, 80], [128, 205], [82, 205]], fill: '#DFE4EA', stroke: '#1e1e2e', width: 5 },
          { type: 'rect', x: 86, y: 55, w: 38, h: 25, r: 4, fill: '#FFD12A', stroke: '#1e1e2e', width: 3 },
          // Intense bright light beam cutting left into storm
          { type: 'path', points: [[86, 68], [15, 45], [15, 90]], fill: 'rgba(255, 209, 42, 0.5)' }
        ]
      }
    ]
  }
];

/**
 * Universal Procedural Renderer
 * Draws topic variant onto a Canvas 2D context.
 * Auto-scales and centers neatly within canvas bounds.
 */
function drawTopicProcedural(ctx, topic, progress = 1.0, variantIndex = 0) {
  if (!topic || !topic.variants || topic.variants.length === 0) return;

  const vIdx = Math.abs(variantIndex) % topic.variants.length;
  const variant = topic.variants[vIdx];
  const strokes = variant.strokes;
  if (!strokes || strokes.length === 0) return;

  const totalStrokes = strokes.length;
  const strokesToDraw = Math.max(1, Math.floor(totalStrokes * Math.min(1.0, progress)));

  const baseW = 200;
  const baseH = 260;
  const cWidth = ctx.canvas.width;
  const cHeight = ctx.canvas.height;

  const scale = Math.min(cWidth / baseW, cHeight / baseH) * 0.92;
  const offsetX = (cWidth - baseW * scale) / 2;
  const offsetY = (cHeight - baseH * scale) / 2;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  for (let i = 0; i < strokesToDraw; i++) {
    renderStroke(ctx, strokes[i]);
  }

  ctx.restore();
}

function renderStroke(ctx, s) {
  ctx.save();
  ctx.lineCap = s.cap || 'round';
  ctx.lineJoin = 'round';

  if (s.type === 'circle') {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    if (s.fill && s.fill !== 'none') {
      ctx.fillStyle = s.fill;
      ctx.fill();
    }
    if (s.stroke) {
      ctx.strokeStyle = s.stroke;
      ctx.lineWidth = s.width || 3;
      ctx.stroke();
    }
  } else if (s.type === 'oval') {
    ctx.beginPath();
    ctx.ellipse(s.x, s.y, s.rx, s.ry, s.rot || 0, 0, Math.PI * 2);
    if (s.fill && s.fill !== 'none') {
      ctx.fillStyle = s.fill;
      ctx.fill();
    }
    if (s.stroke) {
      ctx.strokeStyle = s.stroke;
      ctx.lineWidth = s.width || 3;
      ctx.stroke();
    }
  } else if (s.type === 'rect') {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(s.x, s.y, s.w, s.h, s.r || 0);
    } else {
      ctx.rect(s.x, s.y, s.w, s.h);
    }
    if (s.fill && s.fill !== 'none') {
      ctx.fillStyle = s.fill;
      ctx.fill();
    }
    if (s.stroke) {
      ctx.strokeStyle = s.stroke;
      ctx.lineWidth = s.width || 3;
      ctx.stroke();
    }
  } else if (s.type === 'line') {
    ctx.beginPath();
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
    ctx.strokeStyle = s.stroke;
    ctx.lineWidth = s.width || 3;
    ctx.stroke();
  } else if (s.type === 'path') {
    ctx.beginPath();
    s.points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.closePath();
    if (s.fill && s.fill !== 'none') {
      ctx.fillStyle = s.fill;
      ctx.fill();
    }
    if (s.stroke) {
      ctx.strokeStyle = s.stroke;
      ctx.lineWidth = s.width || 3;
      ctx.stroke();
    }
  } else if (s.type === 'arc') {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, s.start, s.end);
    if (s.fill && s.fill !== 'none') {
      ctx.fillStyle = s.fill;
      ctx.fill();
    }
    if (s.stroke) {
      ctx.strokeStyle = s.stroke;
      ctx.lineWidth = s.width || 3;
      ctx.stroke();
    }
  } else if (s.type === 'capsule') {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(s.x - s.w / 2, s.y - s.h / 2, s.w, s.h, s.w / 2);
    } else {
      ctx.rect(s.x - s.w / 2, s.y - s.h / 2, s.w, s.h);
    }
    if (s.fill) {
      ctx.fillStyle = s.fill;
      ctx.fill();
    }
    if (s.stroke) {
      ctx.strokeStyle = s.stroke;
      ctx.lineWidth = s.width || 3;
      ctx.stroke();
    }
  } else if (s.type === 'heart') {
    const x = s.x;
    const y = s.y;
    const sz = s.size || 16;
    ctx.beginPath();
    ctx.moveTo(x, y + sz * 0.3);
    ctx.bezierCurveTo(x, y, x - sz, y, x - sz, y + sz * 0.4);
    ctx.bezierCurveTo(x - sz, y + sz * 0.8, x, y + sz * 1.1, x, y + sz * 1.3);
    ctx.bezierCurveTo(x, y + sz * 1.1, x + sz, y + sz * 0.8, x + sz, y + sz * 0.4);
    ctx.bezierCurveTo(x + sz, y, x, y, x, y + sz * 0.3);
    if (s.fill) {
      ctx.fillStyle = s.fill;
      ctx.fill();
    }
    if (s.stroke) {
      ctx.strokeStyle = s.stroke;
      ctx.lineWidth = s.width || 2;
      ctx.stroke();
    }
  } else if (s.type === 'star') {
    const cx = s.x;
    const cy = s.y;
    const sz = s.size || 8;
    ctx.fillStyle = s.color || '#FFD12A';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * sz + cx,
                 -Math.sin((18 + i * 72) * Math.PI / 180) * sz + cy);
      ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (sz / 2) + cx,
                 -Math.sin((54 + i * 72) * Math.PI / 180) * (sz / 2) + cy);
    }
    ctx.closePath();
    ctx.fill();
  } else if (s.type === 'leaf') {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.angle || 0);
    ctx.fillStyle = s.color || '#2ED573';
    ctx.strokeStyle = '#1e1e2e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-15, -45, 0, -65);
    ctx.quadraticCurveTo(15, -45, 0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  } else if (s.type === 'drip') {
    ctx.strokeStyle = s.color || '#F1C40F';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x, s.y + s.len);
    ctx.stroke();
  } else if (s.type === 'wave') {
    ctx.strokeStyle = s.color || '#4D96FF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 40; x <= 160; x += 20) {
      ctx.quadraticCurveTo(x + 5, s.y - 6, x + 10, s.y);
      ctx.quadraticCurveTo(x + 15, s.y + 6, x + 20, s.y);
    }
    ctx.stroke();
  } else if (s.type === 'gridLines') {
    ctx.strokeStyle = s.stroke || '#D35400';
    ctx.lineWidth = s.width || 2;
    for (let g = -s.rx + 10; g < s.rx; g += 16) {
      ctx.beginPath();
      ctx.moveTo(s.cx + g, s.cy - s.ry * 0.7);
      ctx.lineTo(s.cx - g, s.cy + s.ry * 0.7);
      ctx.stroke();
    }
  } else if (s.type === 'sprinkles') {
    const colors = ['#FF4757', '#2ED573', '#1E90FF', '#FFA502', '#FFFFFF'];
    const count = s.count || 12;
    for (let j = 0; j < count; j++) {
      const angle = (j / count) * Math.PI * 2;
      const rad = s.radius || 35;
      const px = s.cx + Math.cos(angle) * (rad + (j % 3) * 6);
      const py = s.cy + Math.sin(angle) * (rad + (j % 3) * 6);
      ctx.fillStyle = colors[j % colors.length];
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (s.type === 'whiskers') {
    ctx.strokeStyle = '#1e1e2e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(s.cx - 20, s.cy - 4); ctx.lineTo(s.cx - 50, s.cy - 12);
    ctx.moveTo(s.cx - 20, s.cy + 4); ctx.lineTo(s.cx - 50, s.cy + 10);
    ctx.moveTo(s.cx + 20, s.cy - 4); ctx.lineTo(s.cx + 50, s.cy - 12);
    ctx.moveTo(s.cx + 20, s.cy + 4); ctx.lineTo(s.cx + 50, s.cy + 10);
    ctx.stroke();
  } else if (s.type === 'donutIcing') {
    ctx.beginPath();
    ctx.arc(s.cx, s.cy, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.fill;
    ctx.fill();
    ctx.strokeStyle = s.stroke;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(s.cx, s.cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();
  } else if (s.type === 'spikes') {
    ctx.fillStyle = '#FFA502';
    ctx.strokeStyle = '#1e1e2e';
    ctx.lineWidth = 3;
    for (let k = 0; k < 4; k++) {
      ctx.beginPath();
      ctx.moveTo(s.cx - 30 + k * 18, s.cy - 10);
      ctx.lineTo(s.cx - 22 + k * 18, s.cy - 25);
      ctx.lineTo(s.cx - 14 + k * 18, s.cy - 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  } else if (s.type === 'music_note') {
    ctx.fillStyle = s.color || '#1e1e2e';
    ctx.beginPath();
    ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(s.x + 3, s.y - 18, 3, 18);
    ctx.fillRect(s.x + 3, s.y - 18, 10, 4);
  }

  ctx.restore();
}

window.GAME_TOPICS = GAME_TOPICS;
window.drawTopicProcedural = drawTopicProcedural;
