/*
  Doodle Zoo animal library.
  Each animal has two levels (easy / hard). Each level is a list of steps;
  each step is something the child draws on paper, made of one or more shapes:
    { c: [cx, cy, r] }            circle
    { e: [cx, cy, rx, ry] }       oval
    { d: "M … " }                 any SVG path
    { sc: [cx, cy, r, n, rot] }   fluffy scalloped ring with n bumps
    f: 1                          filled in (eyes, noses…)
  Canvas is 400 × 400 unless a level sets its own `view`.
  Animals unlock in this order.
*/
const flake = (x, y) => ({ d: `M${x} ${y - 10}L${x} ${y + 10}M${x - 9} ${y - 5}L${x + 9} ${y + 5}M${x - 9} ${y + 5}L${x + 9} ${y - 5}` });

const ANIMALS = [
  /* ------------------------------------------------------------------ FISH */
  {
    id: 'fish', name: 'Fish', emoji: '🐟',
    levels: {
      easy: { steps: [
        { say: 'Draw a big oval. This is the fish’s body.', s: [{ e: [180, 200, 110, 70] }] },
        { say: 'Add a tail on the right side, like a big V.', s: [{ d: 'M285 180L355 140L345 200L355 260L285 220' }] },
        { say: 'Draw a round eye with a dot inside.', s: [{ c: [110, 185, 14] }, { c: [113, 186, 6], f: 1 }] },
        { say: 'Give your fish a happy smile.', s: [{ d: 'M80 215Q95 230 114 220' }] },
        { say: 'Draw a curved fin on top.', s: [{ d: 'M150 135Q190 95 235 140' }] },
      ] },
      hard: { steps: [
        { say: 'Draw a big oval for the body.', s: [{ e: [180, 200, 110, 70] }] },
        { say: 'Add the tail on the right, with a little point in the middle.', s: [{ d: 'M285 180L355 140L345 200L355 260L285 220' }] },
        { say: 'Draw the eye: a circle with a dot inside.', s: [{ c: [110, 185, 14] }, { c: [113, 186, 6], f: 1 }] },
        { say: 'Draw a small smile under the eye.', s: [{ d: 'M80 215Q95 230 114 220' }] },
        { say: 'Draw a curved line behind the eye. This is the gill.', s: [{ d: 'M140 150Q158 200 140 250' }] },
        { say: 'Add a fin on top of the body.', s: [{ d: 'M150 135Q190 95 235 140' }] },
        { say: 'Add a smaller fin underneath.', s: [{ d: 'M170 270Q190 300 215 266' }] },
        { say: 'Draw little U shapes for the scales.', s: [{ d: 'M170 175q12 14 24 0M194 175q12 14 24 0M218 175q12 14 24 0M182 205q12 14 24 0M206 205q12 14 24 0M230 205q12 14 24 0M194 235q12 14 24 0' }] },
        { say: 'Draw two lines on the tail.', s: [{ d: 'M300 185L335 160M300 215L335 240' }] },
        { say: 'Finish with bubbles going up!', s: [{ c: [60, 120, 8] }, { c: [45, 85, 12] }, { c: [68, 52, 6] }] },
      ] },
    },
  },

  /* ------------------------------------------------------------------- CAT */
  {
    id: 'cat', name: 'Cat', emoji: '🐱',
    levels: {
      easy: { steps: [
        { say: 'Draw a big circle for the head.', s: [{ c: [200, 140, 70] }] },
        { say: 'Add two pointy ears on top, like triangles.', s: [{ d: 'M151 91L145 35L188 71' }, { d: 'M249 91L255 35L212 71' }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [175, 130, 8], f: 1 }, { c: [225, 130, 8], f: 1 }] },
        { say: 'Draw a little triangle nose and a smile.', s: [{ d: 'M192 152L208 152L200 162Z', f: 1 }, { d: 'M200 162Q190 178 178 170M200 162Q210 178 222 170' }] },
        { say: 'Draw the body under the head, like a big bell.', s: [{ d: 'M165 201Q120 280 135 340L265 340Q280 280 235 201' }] },
        { say: 'Add a long curly tail!', s: [{ d: 'M265 330Q330 320 320 260Q315 230 335 220' }] },
      ] },
      hard: { steps: [
        { say: 'Draw a big circle for the head.', s: [{ c: [200, 140, 70] }] },
        { say: 'Add two pointy ears on top.', s: [{ d: 'M151 91L145 35L188 71' }, { d: 'M249 91L255 35L212 71' }] },
        { say: 'Draw a smaller triangle inside each ear.', s: [{ d: 'M158 82L154 52L176 70' }, { d: 'M242 82L246 52L224 70' }] },
        { say: 'Draw three little stripes on the forehead.', s: [{ d: 'M190 82L193 98M200 79L200 97M210 82L207 98' }] },
        { say: 'Draw two ovals for the eyes.', s: [{ e: [175, 128, 12, 15] }, { e: [225, 128, 12, 15] }] },
        { say: 'Draw a thin black pupil in each eye.', s: [{ e: [175, 130, 4, 9], f: 1 }, { e: [225, 130, 4, 9], f: 1 }] },
        { say: 'Add a triangle nose and a smile.', s: [{ d: 'M192 152L208 152L200 162Z', f: 1 }, { d: 'M200 162Q190 178 178 170M200 162Q210 178 222 170' }] },
        { say: 'Draw whiskers: two lines on each side.', s: [{ d: 'M160 158L115 150M160 166L115 172M240 158L285 150M240 166L285 172' }] },
        { say: 'Draw the body like a big bell.', s: [{ d: 'M165 201Q120 280 135 340L265 340Q280 280 235 201' }] },
        { say: 'Draw lines for the front legs, and little toes.', s: [{ d: 'M175 340L178 272M200 340L200 278M225 340L222 272' }, { d: 'M187 340l0-8M212 340l0-8' }] },
        { say: 'Finish with a long curly tail!', s: [{ d: 'M265 330Q330 320 320 260Q315 230 335 220' }] },
      ] },
    },
  },

  /* ------------------------------------------------------------------- PIG */
  {
    id: 'pig', name: 'Pig', emoji: '🐷',
    levels: {
      easy: { steps: [
        { say: 'Draw a big wide oval for the head.', s: [{ e: [200, 200, 110, 95] }] },
        { say: 'Draw a smaller oval in the middle. That’s the snout!', s: [{ e: [200, 225, 40, 28] }] },
        { say: 'Draw two nostrils inside the snout.', s: [{ e: [186, 225, 6, 10], f: 1 }, { e: [214, 225, 6, 10], f: 1 }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [165, 175, 9], f: 1 }, { c: [235, 175, 9], f: 1 }] },
        { say: 'Add two floppy ears on top.', s: [{ d: 'M137 122Q110 70 115 60Q160 75 181 106' }, { d: 'M263 122Q290 70 285 60Q240 75 219 106' }] },
        { say: 'Draw a big happy smile.', s: [{ d: 'M175 265Q200 282 225 265' }] },
      ] },
      hard: { steps: [
        { say: 'Draw a big wide oval for the head.', s: [{ e: [200, 200, 110, 95] }] },
        { say: 'Draw the snout: an oval in the middle.', s: [{ e: [200, 225, 40, 28] }] },
        { say: 'Add two nostrils.', s: [{ e: [186, 225, 6, 10], f: 1 }, { e: [214, 225, 6, 10], f: 1 }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [165, 175, 9], f: 1 }, { c: [235, 175, 9], f: 1 }] },
        { say: 'Draw curved eyebrows above the eyes.', s: [{ d: 'M150 152Q165 144 180 152M220 152Q235 144 250 152' }] },
        { say: 'Add two floppy ears on top.', s: [{ d: 'M137 122Q110 70 115 60Q160 75 181 106' }, { d: 'M263 122Q290 70 285 60Q240 75 219 106' }] },
        { say: 'Draw a smaller line inside each ear.', s: [{ d: 'M145 116Q128 88 128 76Q156 86 172 108' }, { d: 'M255 116Q272 88 272 76Q244 86 228 108' }] },
        { say: 'Draw round cheeks on each side.', s: [{ c: [140, 232, 14] }, { c: [260, 232, 14] }] },
        { say: 'Draw a big smile.', s: [{ d: 'M175 265Q200 282 225 265' }] },
        { say: 'Add a little curl of hair on top.', s: [{ d: 'M190 106Q186 80 202 88Q212 72 214 106' }] },
        { say: 'Draw two little feet under the head.', s: [{ d: 'M150 285L150 330L180 330L180 293' }, { d: 'M250 285L250 330L220 330L220 293' }, { d: 'M165 330l0-10M235 330l0-10' }] },
      ] },
    },
  },

  /* ------------------------------------------------------------------- OWL */
  {
    id: 'owl', name: 'Owl', emoji: '🦉',
    levels: {
      easy: { steps: [
        { say: 'Draw a big egg shape for the body.', s: [{ e: [200, 210, 100, 125] }] },
        { say: 'Draw two big circles for the eyes.', s: [{ c: [160, 165, 35] }, { c: [240, 165, 35] }] },
        { say: 'Draw a big dot inside each eye.', s: [{ c: [165, 170, 13], f: 1 }, { c: [235, 170, 13], f: 1 }] },
        { say: 'Draw a small triangle beak.', s: [{ d: 'M190 205L210 205L200 228Z' }] },
        { say: 'Add two pointy feather tufts on top.', s: [{ d: 'M150 102L140 55L183 87' }, { d: 'M250 102L260 55L217 87' }] },
        { say: 'Draw a curved wing on each side.', s: [{ d: 'M102 230Q120 290 165 305' }, { d: 'M298 230Q280 290 235 305' }] },
        { say: 'Add little feet at the bottom.', s: [{ d: 'M175 332l-8 16M183 334l0 18M191 334l8 16M209 334l-8 16M217 334l0 18M225 332l8 16' }] },
      ] },
      hard: { steps: [
        { say: 'Draw a big egg shape for the body.', s: [{ e: [200, 210, 100, 125] }] },
        { say: 'Add two pointy feather tufts on top.', s: [{ d: 'M150 102L140 55L183 87' }, { d: 'M250 102L260 55L217 87' }] },
        { say: 'Draw two big circles for the eyes.', s: [{ c: [160, 165, 35] }, { c: [240, 165, 35] }] },
        { say: 'Draw a smaller circle inside each eye.', s: [{ c: [160, 165, 20] }, { c: [240, 165, 20] }] },
        { say: 'Draw a dot in the middle of each eye.', s: [{ c: [162, 168, 9], f: 1 }, { c: [238, 168, 9], f: 1 }] },
        { say: 'Draw a triangle beak.', s: [{ d: 'M190 205L210 205L200 228Z' }] },
        { say: 'Draw a curved wing on each side.', s: [{ d: 'M102 230Q120 290 165 305' }, { d: 'M298 230Q280 290 235 305' }] },
        { say: 'Draw little V feathers on the tummy.', s: [{ d: 'M170 250q10 10 20 0M210 250q10 10 20 0M190 272q10 10 20 0M170 294q10 10 20 0M210 294q10 10 20 0' }] },
        { say: 'Add the feet with three toes each.', s: [{ d: 'M175 332l-8 16M183 334l0 16M191 334l8 16M209 334l-8 16M217 334l0 16M225 332l8 16' }] },
        { say: 'Draw a branch for your owl to sit on.', s: [{ d: 'M40 350L360 350M40 366L360 366M360 350Q372 358 360 366M40 350Q28 358 40 366' }] },
      ] },
    },
  },

  /* ----------------------------------------------------------------- BUNNY */
  {
    id: 'bunny', name: 'Bunny', emoji: '🐰',
    levels: {
      easy: { steps: [
        { say: 'Draw a circle for the head.', s: [{ c: [200, 200, 65] }] },
        { say: 'Add two long ears on top.', s: [{ d: 'M155 153Q130 40 165 35Q195 40 185 137' }, { d: 'M245 153Q270 40 235 35Q205 40 215 137' }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [178, 190, 8], f: 1 }, { c: [222, 190, 8], f: 1 }] },
        { say: 'Draw a little nose and a mouth like the letter W.', s: [{ d: 'M192 212L208 212L200 222Z', f: 1 }, { d: 'M200 222L200 232M200 232Q190 240 182 234M200 232Q210 240 218 234' }] },
        { say: 'Draw the body under the head.', s: [{ d: 'M165 255Q110 330 140 365L260 365Q290 330 235 255' }] },
        { say: 'Add two big feet at the bottom.', s: [{ d: 'M145 365Q135 390 170 390Q195 390 192 365' }, { d: 'M255 365Q265 390 230 390Q205 390 208 365' }] },
      ] },
      hard: { steps: [
        { say: 'Draw a circle for the head.', s: [{ c: [200, 200, 65] }] },
        { say: 'Add two long ears on top.', s: [{ d: 'M155 153Q130 40 165 35Q195 40 185 137' }, { d: 'M245 153Q270 40 235 35Q205 40 215 137' }] },
        { say: 'Draw a thinner line inside each ear.', s: [{ d: 'M163 143Q148 60 167 55Q182 60 178 138' }, { d: 'M237 143Q252 60 233 55Q218 60 222 138' }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [178, 190, 8], f: 1 }, { c: [222, 190, 8], f: 1 }] },
        { say: 'Draw a little triangle nose.', s: [{ d: 'M192 212L208 212L200 222Z', f: 1 }] },
        { say: 'Draw a mouth like the letter W.', s: [{ d: 'M200 222L200 232M200 232Q190 240 182 234M200 232Q210 240 218 234' }] },
        { say: 'Draw whiskers on both sides.', s: [{ d: 'M172 220L140 212M172 228L140 234M228 220L260 212M228 228L260 234' }] },
        { say: 'Draw the body under the head.', s: [{ d: 'M165 255Q110 330 140 365L260 365Q290 330 235 255' }] },
        { say: 'Draw an oval for the tummy.', s: [{ e: [200, 318, 35, 38] }] },
        { say: 'Add two big feet.', s: [{ d: 'M145 365Q135 390 170 390Q195 390 192 365' }, { d: 'M255 365Q265 390 230 390Q205 390 208 365' }] },
        { say: 'Draw little toe lines on the feet.', s: [{ d: 'M160 390l0-9M172 390l0-9M240 390l0-9M228 390l0-9' }] },
        { say: 'Finish with a yummy carrot!', s: [{ d: 'M285 310L332 262L346 277Z' }, { d: 'M339 269L352 244M339 269L364 258M339 269L362 248' }, { d: 'M308 291l8 6M298 301l7 6' }] },
      ] },
    },
  },

  /* ------------------------------------------------------------------ BEAR */
  {
    id: 'bear', name: 'Bear', emoji: '🐻',
    levels: {
      easy: { steps: [
        { say: 'Draw a big circle for the head.', s: [{ c: [200, 200, 90] }] },
        { say: 'Add two round ears on top.', s: [{ d: 'M120.4 157.9A32 32 0 1 1 162.5 118.2' }, { d: 'M279.6 157.9A32 32 0 1 0 237.5 118.2' }] },
        { say: 'Draw a small circle inside each ear.', s: [{ c: [128, 124, 13] }, { c: [272, 124, 13] }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [165, 185, 9], f: 1 }, { c: [235, 185, 9], f: 1 }] },
        { say: 'Draw an oval at the bottom for the snout.', s: [{ e: [200, 235, 45, 35] }] },
        { say: 'Add a nose and a smile inside the snout.', s: [{ e: [200, 222, 14, 10], f: 1 }, { d: 'M200 232L200 248M200 248Q188 258 178 250M200 248Q212 258 222 250' }] },
      ] },
      hard: { view: '-40 50 480 510', steps: [
        { say: 'Draw a big circle for the head.', s: [{ c: [200, 200, 90] }] },
        { say: 'Add two round ears on top.', s: [{ d: 'M120.4 157.9A32 32 0 1 1 162.5 118.2' }, { d: 'M279.6 157.9A32 32 0 1 0 237.5 118.2' }] },
        { say: 'Draw a small circle inside each ear.', s: [{ c: [128, 124, 13] }, { c: [272, 124, 13] }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [165, 185, 9], f: 1 }, { c: [235, 185, 9], f: 1 }] },
        { say: 'Draw an oval for the snout.', s: [{ e: [200, 235, 45, 35] }] },
        { say: 'Draw the nose at the top of the snout.', s: [{ e: [200, 222, 14, 10], f: 1 }] },
        { say: 'Draw the mouth.', s: [{ d: 'M200 232L200 248M200 248Q188 258 178 250M200 248Q212 258 222 250' }] },
        { say: 'Draw a big round body under the head.', s: [{ d: 'M140 267Q50 390 100 510L300 510Q350 390 260 267' }] },
        { say: 'Add two arms resting on the tummy.', s: [{ d: 'M110 316Q145 368 178 350Q162 322 120 297' }, { d: 'M290 316Q255 368 222 350Q238 322 280 297' }] },
        { say: 'Draw a big oval for the tummy.', s: [{ e: [200, 415, 55, 60] }] },
        { say: 'Draw two big feet at the bottom.', s: [{ d: 'M100 510Q80 542 135 542Q185 542 180 510' }, { d: 'M300 510Q320 542 265 542Q215 542 220 510' }] },
        { say: 'Finish with a paw pad on each foot.', s: [{ c: [140, 526, 8] }, { c: [260, 526, 8] }] },
      ] },
    },
  },

  /* ---------------------------------------------------------------- TURTLE */
  {
    id: 'turtle', name: 'Turtle', emoji: '🐢',
    levels: {
      easy: { steps: [
        { say: 'Draw a big dome for the shell, with a flat bottom.', s: [{ d: 'M90 260C100 120 300 120 310 260Z' }] },
        { say: 'Draw a circle for the head on the right.', s: [{ c: [335, 225, 28] }] },
        { say: 'Add an eye and a smile.', s: [{ c: [342, 216, 5], f: 1 }, { d: 'M328 236Q340 244 352 236' }] },
        { say: 'Draw two legs under the shell.', s: [{ d: 'M120 260L120 290Q135 305 150 290L150 260' }, { d: 'M250 260L250 290Q265 305 280 290L280 260' }] },
        { say: 'Add a tiny pointy tail.', s: [{ d: 'M93 248L62 262L90 260' }] },
        { say: 'Draw a big hexagon pattern on the shell.', s: [{ d: 'M175 170L225 170L245 205L225 240L175 240L155 205Z' }] },
      ] },
      hard: { steps: [
        { say: 'Draw a big dome for the shell, with a flat bottom.', s: [{ d: 'M90 260C100 120 300 120 310 260Z' }] },
        { say: 'Draw a line along the bottom of the shell.', s: [{ d: 'M97 245L303 245' }] },
        { say: 'Draw a hexagon in the middle. It has six sides!', s: [{ d: 'M175 170L225 170L245 205L225 240L175 240L155 205Z' }] },
        { say: 'Draw lines from the hexagon to the edge of the shell.', s: [{ d: 'M155 205L107 206M245 205L293 206M175 170L169 160M225 170L231 160M175 240L168 245M225 240L232 245' }] },
        { say: 'Draw a circle for the head.', s: [{ c: [335, 225, 28] }] },
        { say: 'Add an eye and a smile.', s: [{ c: [342, 216, 5], f: 1 }, { d: 'M328 236Q340 244 352 236' }] },
        { say: 'Draw some spots on the head.', s: [{ c: [322, 210, 4] }, { c: [330, 200, 3] }] },
        { say: 'Draw two legs under the shell.', s: [{ d: 'M120 260L120 290Q135 305 150 290L150 260' }, { d: 'M250 260L250 290Q265 305 280 290L280 260' }] },
        { say: 'Add little claws on the feet.', s: [{ d: 'M126 297l-2 7M135 299l0 7M144 297l2 7M256 297l-2 7M265 299l0 7M274 297l2 7' }] },
        { say: 'Add a tiny pointy tail.', s: [{ d: 'M93 248L62 262L90 260' }] },
        { say: 'Draw the ground and some grass.', s: [{ d: 'M30 315L370 315M60 315l-4-12M66 315l2-14M72 315l6-10M330 315l-4-12M336 315l2-14M342 315l6-10' }] },
      ] },
    },
  },

  /* --------------------------------------------------------------- PENGUIN */
  {
    id: 'penguin', name: 'Penguin', emoji: '🐧',
    levels: {
      easy: { steps: [
        { say: 'Draw a big tall oval for the body.', s: [{ e: [200, 215, 95, 135] }] },
        { say: 'Draw a smaller oval inside for the white tummy.', s: [{ e: [200, 240, 60, 100] }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [178, 105, 8], f: 1 }, { c: [222, 105, 8], f: 1 }] },
        { say: 'Draw a triangle beak between the eyes.', s: [{ d: 'M188 118L212 118L200 134Z' }] },
        { say: 'Add a flipper on each side.', s: [{ d: 'M108 180Q60 240 80 290Q100 270 110 260' }, { d: 'M292 180Q340 240 320 290Q300 270 290 260' }] },
        { say: 'Add two feet at the bottom.', s: [{ d: 'M165 340Q150 365 175 365Q195 365 190 348' }, { d: 'M235 340Q250 365 225 365Q205 365 210 348' }] },
      ] },
      hard: { steps: [
        { say: 'Draw a big tall oval for the body.', s: [{ e: [200, 215, 95, 135] }] },
        { say: 'Draw a smaller oval inside for the tummy.', s: [{ e: [200, 240, 60, 100] }] },
        { say: 'Draw two circles for the eyes.', s: [{ c: [178, 105, 11] }, { c: [222, 105, 11] }] },
        { say: 'Draw a dot inside each eye.', s: [{ c: [180, 107, 5], f: 1 }, { c: [220, 107, 5], f: 1 }] },
        { say: 'Draw a triangle beak.', s: [{ d: 'M188 118L212 118L200 134Z' }] },
        { say: 'Draw round cheeks.', s: [{ c: [158, 130, 9] }, { c: [242, 130, 9] }] },
        { say: 'Add a flipper on each side.', s: [{ d: 'M108 180Q60 240 80 290Q100 270 110 260' }, { d: 'M292 180Q340 240 320 290Q300 270 290 260' }] },
        { say: 'Draw little feather marks on the tummy.', s: [{ d: 'M180 200q7 7 14 0M206 235q7 7 14 0M178 272q7 7 14 0M205 305q7 7 14 0' }] },
        { say: 'Add two feet.', s: [{ d: 'M165 340Q150 365 175 365Q195 365 190 348' }, { d: 'M235 340Q250 365 225 365Q205 365 210 348' }] },
        { say: 'Draw the icy ground and some snowflakes!', s: [{ d: 'M40 366L150 366M250 366L360 366' }, flake(60, 70), flake(345, 60), flake(55, 330), flake(340, 330)] },
      ] },
    },
  },

  /* -------------------------------------------------------------- ELEPHANT */
  {
    id: 'elephant', name: 'Elephant', emoji: '🐘',
    levels: {
      easy: { view: '25 30 380 380', steps: [
        { say: 'Draw a circle for the head.', s: [{ c: [150, 170, 65] }] },
        { say: 'Draw a big floppy ear on the side of the head.', s: [{ d: 'M183 114Q270 80 275 170Q270 250 200 212' }] },
        { say: 'Draw a long trunk going down, with a curl at the end.', s: [{ d: 'M89 192Q60 250 75 300Q85 310 92 298Q85 255 118 226' }] },
        { say: 'Draw a dot for the eye.', s: [{ c: [135, 160, 7], f: 1 }] },
        { say: 'Draw the big body with four legs.', s: [{ d: 'M268 203C340 185 375 230 365 290L365 335L330 335L330 300L245 300L245 335L210 335L210 270Q210 240 225 222' }] },
        { say: 'Add a little tail.', s: [{ d: 'M364 249Q388 262 382 292' }, { d: 'M376 290L382 304L388 290' }] },
      ] },
      hard: { view: '25 30 380 380', steps: [
        { say: 'Draw a circle for the head.', s: [{ c: [150, 170, 65] }] },
        { say: 'Draw a big floppy ear.', s: [{ d: 'M183 114Q270 80 275 170Q270 250 200 212' }] },
        { say: 'Draw a second line inside the ear.', s: [{ d: 'M202 128Q255 108 258 170Q255 225 208 203' }] },
        { say: 'Draw a dot for the eye, and an eyebrow.', s: [{ c: [135, 160, 7], f: 1 }, { d: 'M124 145Q135 138 146 144' }] },
        { say: 'Draw a long trunk with a curl at the end.', s: [{ d: 'M89 192Q60 250 75 300Q85 310 92 298Q85 255 118 226' }] },
        { say: 'Draw little lines across the trunk.', s: [{ d: 'M75 238L100 243M72 258L93 256M72 278L90 276' }] },
        { say: 'Draw a white tusk next to the trunk.', s: [{ d: 'M128 229Q132 260 108 264Q120 250 114 225' }] },
        { say: 'Draw the big body with four legs.', s: [{ d: 'M268 203C340 185 375 230 365 290L365 335L330 335L330 300L245 300L245 335L210 335L210 270Q210 240 225 222' }] },
        { say: 'Draw toenails at the bottom of the feet.', s: [{ d: 'M213 335q6-8 12 0M229 335q6-8 12 0M333 335q6-8 12 0M349 335q6-8 12 0' }] },
        { say: 'Finish with a tail and a fluffy tip.', s: [{ d: 'M364 249Q388 262 382 292' }, { d: 'M376 290L382 304L388 290' }] },
      ] },
    },
  },

  /* ------------------------------------------------------------------ LION */
  {
    id: 'lion', name: 'Lion', emoji: '🦁',
    levels: {
      easy: { steps: [
        { say: 'Draw a circle for the face.', s: [{ c: [200, 200, 70] }] },
        { say: 'Add two little round ears.', s: [{ d: 'M142.5 160A20 20 0 1 1 165.1 139.4' }, { d: 'M257.5 160A20 20 0 1 0 234.9 139.4' }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [175, 190, 8], f: 1 }, { c: [225, 190, 8], f: 1 }] },
        { say: 'Draw a big triangle nose.', s: [{ d: 'M185 215L215 215L200 232Z', f: 1 }] },
        { say: 'Draw the mouth under the nose.', s: [{ d: 'M200 232L200 242M200 242Q188 254 176 246M200 242Q212 254 224 246' }] },
        { say: 'Draw a big fluffy mane all around, like a cloud!', s: [{ sc: [200, 200, 110, 14] }] },
      ] },
      hard: { steps: [
        { say: 'Draw a circle for the face.', s: [{ c: [200, 200, 70] }] },
        { say: 'Add two little round ears.', s: [{ d: 'M142.5 160A20 20 0 1 1 165.1 139.4' }, { d: 'M257.5 160A20 20 0 1 0 234.9 139.4' }] },
        { say: 'Draw a small circle inside each ear.', s: [{ c: [145, 140, 9] }, { c: [255, 140, 9] }] },
        { say: 'Draw two dots for the eyes.', s: [{ c: [175, 190, 8], f: 1 }, { c: [225, 190, 8], f: 1 }] },
        { say: 'Draw eyebrows above the eyes.', s: [{ d: 'M163 174Q175 166 187 173M213 173Q225 166 237 174' }] },
        { say: 'Draw a big triangle nose.', s: [{ d: 'M185 215L215 215L200 232Z', f: 1 }] },
        { say: 'Draw the mouth.', s: [{ d: 'M200 232L200 242M200 242Q188 254 176 246M200 242Q212 254 224 246' }] },
        { say: 'Draw a little curve for the chin.', s: [{ d: 'M187 262Q200 268 213 262' }] },
        { say: 'Draw whisker dots on the cheeks.', s: [{ c: [168, 230, 2.5], f: 1 }, { c: [160, 240, 2.5], f: 1 }, { c: [172, 242, 2.5], f: 1 }, { c: [232, 230, 2.5], f: 1 }, { c: [240, 240, 2.5], f: 1 }, { c: [228, 242, 2.5], f: 1 }] },
        { say: 'Draw a fluffy mane around the face.', s: [{ sc: [200, 200, 110, 14] }] },
        { say: 'Draw a second, bigger fluffy mane around the first one!', s: [{ sc: [200, 200, 132, 16, 11.25] }] },
      ] },
    },
  },
];

/* =====================================================================
   MASTER DRAWINGS ✨ — realistic versions, drawn like real artists do:
   light guide shapes → outline → details → erase guides → shading.
   Extra shape options:
     g: 1        light guide line (disappears after the "erase" step)
     sh: 1|2|3   pencil shading (light, medium, dark), no outline
     w: n        line thickness (thin lines for fur and details)
     t: 1        softer grey line
     f: 'w'      white shine
   ===================================================================== */

/** Rows of little U-shaped feather marks inside an oval. */
function featherMarks(cx, cy, rx, ry, gap = 20, size = 9) {
  let d = '';
  for (let row = 0, y = cy - ry; y <= cy + ry; y += gap * 0.8, row++) {
    for (let x = cx - rx + (row % 2 ? gap / 2 : 0); x <= cx + rx; x += gap) {
      if (((x + size / 2 - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 > 0.9) continue;
      d += `M${x.toFixed(1)} ${y.toFixed(1)}q${size / 2} ${size * 0.6} ${size} 0`;
    }
  }
  return { d, w: 2.5 };
}
/** Short fur strokes pointing outward around an oval, between two angles (degrees, 0 = right, 90 = down). */
function ringStrokes(cx, cy, rx, ry, from, to, n, len, w = 2.5) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = (from + (to - from) * i / (n - 1)) * Math.PI / 180;
    const x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
    d += `M${x.toFixed(1)} ${y.toFixed(1)}l${(len * Math.cos(a)).toFixed(1)} ${(len * Math.sin(a)).toFixed(1)}`;
  }
  return { d, w, t: 1 };
}
/** Short strokes from a list of [x, y, dx, dy]. */
const strokes = (list, w = 2.5) => ({ d: list.map(([x, y, dx, dy]) => `M${x} ${y}l${dx} ${dy}`).join(''), w, t: 1 });

const MASTER = {
  /* ------------------------------------------------------------ OWL ✨ */
  owl: { view: '0 40 400 390', steps: [
    { say: 'Artist trick: press very lightly with your pencil! Sketch a circle for the head, a big oval for the body and a line down the middle.',
      s: [{ g: 1, c: [200, 140, 75] }, { g: 1, e: [200, 280, 92, 105] }, { g: 1, d: 'M200 55L200 395' }] },
    { say: 'Now draw the owl’s outline around your guides: a round head that flows into a big round body.',
      s: [{ d: 'M128 160C122 95 165 62 200 62C235 62 278 95 272 160C292 205 300 270 285 320C272 360 240 378 200 380C160 378 128 360 115 320C100 270 108 205 128 160Z' }] },
    { say: 'Draw the face: a big heart shape in the middle of the head.',
      s: [{ d: 'M200 92C175 78 130 92 135 140C138 180 170 200 200 212C230 200 262 180 265 140C270 92 225 78 200 92Z' }] },
    { say: 'Draw two big round eyes, one on each side of the middle line.',
      s: [{ c: [170, 138, 22] }, { c: [230, 138, 22] }] },
    { say: 'Fill in the big pupils, but leave a tiny white spot for the shine. That makes the eyes look alive!',
      s: [{ c: [172, 140, 13], f: 1 }, { c: [228, 140, 13], f: 1 }, { c: [177, 134, 4], f: 'w' }, { c: [233, 134, 4], f: 'w' }] },
    { say: 'Add the curved eyebrow feathers and a small pointy beak between the eyes.',
      s: [{ d: 'M196 120C185 106 162 104 143 112M204 120C215 106 238 104 257 112', w: 4 }, { d: 'M200 152C192 160 194 174 200 184C206 174 208 160 200 152Z' }] },
    { say: 'Draw the folded wings on both sides of the body.',
      s: [{ d: 'M135 205C115 255 118 325 148 372C160 330 165 270 150 225C146 214 140 207 135 205Z' }, { d: 'M265 205C285 255 282 325 252 372C240 330 235 270 250 225C254 214 260 207 265 205Z' }] },
    { say: 'Now gently erase your light guide lines.', erase: 1, s: [] },
    { say: 'Draw curved stripes across the wings to show the long feathers.',
      s: [{ d: 'M124 262Q140 256 155 264M124 292Q140 286 158 294M130 322Q143 316 157 324M140 350Q148 345 156 350M276 262Q260 256 245 264M276 292Q260 286 242 294M270 322Q257 316 243 324M260 350Q252 345 244 350', w: 4 }] },
    { say: 'Cover the tummy with lots of little U-shaped feather marks.',
      s: [featherMarks(200, 292, 44, 62, 19, 9)] },
    { say: 'Add small fluffy lines all around the edge of the face.',
      s: [ringStrokes(200, 150, 72, 68, 215, 325, 16, 7)] },
    { say: 'Draw the feet holding the branch, and the branch under them.',
      s: [{ d: 'M182 377C178 384 176 390 178 396M192 379C191 386 191 392 192 398M208 379C209 386 209 392 208 398M218 377C222 384 224 390 222 396', w: 5 },
        { d: 'M30 394C120 388 260 392 380 386M30 416C120 412 260 414 380 408' }, { d: 'M60 402l25 2M250 400l35-1M320 397l22 0', w: 2.5, t: 1 }] },
    { say: 'Shading time! Shade the wings softly. Press a little harder than before.',
      s: [{ sh: 2, d: 'M135 205C115 255 118 325 148 372C160 330 165 270 150 225C146 214 140 207 135 205Z' }, { sh: 2, d: 'M265 205C285 255 282 325 252 372C240 330 235 270 250 225C254 214 260 207 265 205Z' }] },
    { say: 'Now shade very lightly around the head and the sides of the body. Keep the face and the tummy white!',
      s: [{ sh: 1, d: 'M128 160C122 95 165 62 200 62C235 62 278 95 272 160C292 205 300 270 285 320C272 360 240 378 200 380C160 378 128 360 115 320C100 270 108 205 128 160ZM200 92C175 78 130 92 135 140C138 180 170 200 200 212C230 200 262 180 265 140C270 92 225 78 200 92ZM150 295A50 70 0 1 1 250 295A50 70 0 1 1 150 295Z' },
        { sh: 1, d: 'M128 160C108 205 100 270 115 320C128 360 160 378 200 380C170 370 150 345 145 300C140 250 140 200 135 170Z' },
        { sh: 1, d: 'M272 160C292 205 300 270 285 320C272 360 240 378 200 380C230 370 250 345 255 300C260 250 260 200 265 170Z' }] },
    { say: 'Last step: add the darkest shadows on the beak and the branch. You are a real artist!',
      s: [{ sh: 3, d: 'M200 152C192 160 194 174 200 184C206 174 208 160 200 152Z' }, { sh: 2, d: 'M30 394C120 388 260 392 380 386L380 408C260 414 120 412 30 416Z' }] },
  ] },

  /* ------------------------------------------------------------ CAT ✨ */
  cat: { view: '0 30 400 380', steps: [
    { say: 'Press very lightly! Sketch a big circle for the head, a cross to help you place the face, and a small oval for the muzzle.',
      s: [{ g: 1, c: [200, 210, 110] }, { g: 1, d: 'M200 90L200 330M90 195L310 195' }, { g: 1, e: [200, 262, 48, 34] }] },
    { say: 'Draw the outline of the head: two big pointy ears and wide, round cheeks.',
      s: [{ d: 'M112 150L100 48C130 62 160 85 175 110C190 106 210 106 225 110C240 85 270 62 300 48L288 150C310 185 318 225 305 262C292 300 250 330 200 334C150 330 108 300 95 262C82 225 90 185 112 150Z' }] },
    { say: 'Draw the inside of the ears, and a few soft fur lines.',
      s: [{ d: 'M120 135L112 72C135 88 152 102 163 114' }, { d: 'M280 135L288 72C265 88 248 102 237 114' }, strokes([[118, 124, 14, -9], [116, 110, 14, -5], [116, 96, 12, -1], [282, 124, -14, -9], [284, 110, -14, -5], [284, 96, -12, -1]])] },
    { say: 'Draw two almond-shaped eyes sitting on the guide line.',
      s: [{ d: 'M134 195C148 172 184 170 196 191C184 210 148 212 134 195Z' }, { d: 'M266 195C252 172 216 170 204 191C216 210 252 212 266 195Z' }] },
    { say: 'Inside each eye, draw a round iris and a thin slit pupil. Leave a tiny white shine!',
      s: [{ e: [166, 192, 15, 14], w: 3 }, { e: [234, 192, 15, 14], w: 3 }, { e: [166, 192, 4.5, 13], f: 1 }, { e: [234, 192, 4.5, 13], f: 1 }, { c: [172, 185, 3.5], f: 'w' }, { c: [240, 185, 3.5], f: 'w' }] },
    { say: 'Draw the nose: a little upside-down triangle with soft corners, and two lines going up between the eyes.',
      s: [{ d: 'M186 236L214 236C212 244 205 250 200 252C195 250 188 244 186 236Z' }, { d: 'M190 205C192 218 190 228 186 236M210 205C208 218 210 228 214 236', w: 2.5, t: 1 }] },
    { say: 'Draw the mouth under the nose, and a small curve for the chin.',
      s: [{ d: 'M200 252L200 264C194 272 182 274 174 266M200 264C206 272 218 274 226 266' }, { d: 'M184 290C193 297 207 297 216 290', w: 4 }] },
    { say: 'Now gently erase your light guide lines.', erase: 1, s: [] },
    { say: 'Add rows of little whisker dots, then long, gently curved whiskers.',
      s: [{ c: [174, 247, 1.8], f: 1 }, { c: [165, 253, 1.8], f: 1 }, { c: [177, 256, 1.8], f: 1 }, { c: [226, 247, 1.8], f: 1 }, { c: [235, 253, 1.8], f: 1 }, { c: [223, 256, 1.8], f: 1 },
        { d: 'M160 258C125 248 95 246 55 254M160 266C125 266 95 270 58 284M164 274C130 282 108 294 78 316M240 258C275 248 305 246 345 254M240 266C275 266 305 270 342 284M236 274C270 282 292 294 322 316', w: 2 }] },
    { say: 'Draw the tabby stripes: an M shape on the forehead and a few stripes on the cheeks.',
      s: [{ d: 'M176 126C180 145 186 160 192 172M200 118L200 170M224 126C220 145 214 160 208 172M98 206C110 204 122 208 132 215M96 226C108 226 120 230 128 237M302 206C290 204 278 208 268 215M304 226C292 226 280 230 272 237', w: 3.5 }] },
    { say: 'Draw the neck and some fluffy fur on the chest.',
      s: [{ d: 'M125 312C115 345 110 375 106 400M275 312C285 345 290 375 294 400' }, strokes([[168, 342, 6, 15], [186, 346, 4, 15], [204, 346, -2, 15], [222, 342, -5, 15], [176, 368, 5, 15], [200, 372, 0, 15], [222, 368, -5, 15], [97, 262, -10, 6], [101, 278, -10, 8], [109, 293, -8, 10], [303, 262, 10, 6], [299, 278, 10, 8], [291, 293, 8, 10]])] },
    { say: 'Shading time! Shade the inside of the ears and the colored part of the eyes.',
      s: [{ sh: 2, d: 'M120 135L112 72C135 88 152 102 163 114C150 120 132 128 120 135Z' }, { sh: 2, d: 'M280 135L288 72C265 88 248 102 237 114C250 120 268 128 280 135Z' }, { sh: 1, e: [166, 192, 15, 14] }, { sh: 1, e: [234, 192, 15, 14] }] },
    { say: 'Shade softly along the sides of the face, and a darker shadow under the chin.',
      s: [{ sh: 1, d: 'M112 150C90 185 82 225 95 262C108 300 150 330 200 334C160 320 128 290 120 250C114 215 116 180 112 150Z' }, { sh: 1, d: 'M288 150C310 185 318 225 305 262C292 300 250 330 200 334C240 320 272 290 280 250C286 215 284 180 288 150Z' }, { sh: 2, d: 'M140 318C165 332 185 336 200 336C215 336 235 332 260 318C255 340 230 352 200 352C170 352 145 340 140 318Z' }] },
    { say: 'Last step: shade the nose dark, and darken the stripes a little. Beautiful!',
      s: [{ sh: 3, d: 'M186 236L214 236C212 244 205 250 200 252C195 250 188 244 186 236Z' }, { sh: 1, d: 'M176 126C180 145 186 160 192 172L200 170L200 118L208 172L214 160L224 126C215 120 185 120 176 126Z' }] },
  ] },

  /* ---------------------------------------------------------- BUNNY ✨ */
  bunny: { view: '20 0 380 380', steps: [
    { say: 'Press lightly! Sketch a circle for the head, a big oval for the body, and a smaller circle for the back leg.',
      s: [{ g: 1, c: [140, 148, 50] }, { g: 1, e: [240, 268, 110, 88] }, { g: 1, c: [288, 295, 58] }] },
    { say: 'Draw the head from the side: a round forehead and a soft nose pointing left, then the cheek.',
      s: [{ d: 'M155 101C128 98 104 114 96 138C91 150 86 159 88 168C90 178 100 184 110 190C128 202 152 200 168 186' }] },
    { say: 'Draw two long ears going back. The one behind is a little hidden.',
      s: [{ d: 'M150 102C148 60 165 20 196 12C214 8 214 32 204 56C194 80 182 100 175 112' }, { d: 'M184 104C196 74 216 46 240 38C254 36 248 58 232 74C216 90 202 104 192 118' }] },
    { say: 'Draw the long curved back, all the way down to the ground.',
      s: [{ d: 'M190 120C232 145 300 168 335 230C360 275 350 330 320 350' }] },
    { say: 'Draw the chest going down from the cheek, and the front paw on the ground.',
      s: [{ d: 'M118 196C122 225 132 250 140 275C146 300 146 325 150 345C140 352 116 356 108 350C104 344 116 338 140 338' }, { d: 'M160 300C162 320 164 336 170 348' }] },
    { say: 'Draw the big back foot along the ground, and the round thigh.',
      s: [{ d: 'M170 348C185 352 195 354 206 352C204 344 214 340 232 340L318 344C328 352 320 360 300 360L210 360C206 359 205 356 206 352' }, { d: 'M262 340C242 312 242 268 272 246C300 228 330 250 336 282' }] },
    { say: 'Add a fluffy round tail.',
      s: [{ d: 'M348 290C366 282 380 300 372 314C366 324 354 322 348 312' }] },
    { say: 'Draw the eye: a dark oval with a white shine, and a curved line above it.',
      s: [{ e: [132, 138, 8, 10], f: 1 }, { c: [129, 134, 3], f: 'w' }, { d: 'M119 134C124 122 140 122 145 134', w: 3 }] },
    { say: 'Draw the little nose, the mouth and long thin whiskers.',
      s: [{ d: 'M89 160C93 157 97 159 96 164M92 172C96 177 101 177 104 172', w: 3.5 }, { d: 'M94 165C72 158 52 160 36 167M95 169C74 172 56 180 44 191M97 162C82 148 72 138 58 130', w: 1.8 }] },
    { say: 'Now gently erase your light guide lines.', erase: 1, s: [] },
    { say: 'Draw short fur lines on the chest, the thigh and the fluffy tail.',
      s: [strokes([[126, 214, 7, 6], [132, 236, 7, 6], [138, 258, 7, 6], [142, 282, 7, 5], [256, 280, 8, -4], [252, 302, 8, -2], [256, 322, 8, 0], [360, 296, 6, -3], [364, 308, 7, 0]])] },
    { say: 'Shading time! Shade the inside of the ear, and softly under the back.',
      s: [{ sh: 2, d: 'M157 100C158 66 172 30 196 22C206 22 204 40 198 56C190 76 180 92 172 104Z' },
        { sh: 1, d: 'M190 120C232 145 300 168 335 230C360 275 350 330 320 350L300 350C322 320 322 270 300 240C270 200 225 170 192 140Z' }] },
    { say: 'Shade a bit darker under the thigh and under the head, and lightly on the ear behind.',
      s: [{ sh: 2, d: 'M262 340C242 312 242 268 272 246C255 282 258 318 278 344Z' }, { sh: 2, d: 'M118 196C130 205 152 200 168 186C165 205 145 215 125 214Z' }, { sh: 1, d: 'M184 104C196 74 216 46 240 38C254 36 248 58 232 74C216 90 202 104 192 118Z' }] },
    { say: 'Last step: draw a soft shadow on the ground under your bunny. Lovely!',
      s: [{ sh: 1, e: [225, 364, 150, 9] }, { d: 'M70 364l-3-10M75 364l2-12M80 364l5-9M345 364l-3-10M350 364l2-12M355 364l5-9', w: 2.5, t: 1 }] },
  ] },

  /* -------------------------------------------------------- PENGUIN ✨ */
  penguin: { view: '30 40 340 410', steps: [
    { say: 'Press lightly! Sketch a small circle for the head and a tall oval for the body. This is an emperor penguin, the biggest one!',
      s: [{ g: 1, c: [205, 95, 38] }, { g: 1, e: [208, 270, 85, 150] }] },
    { say: 'Draw the head and a long, thin beak pointing to the right.',
      s: [{ d: 'M172 110C165 80 180 58 205 58C228 58 240 75 238 95C255 98 280 108 296 118C278 120 255 118 236 116C230 128 226 135 228 145' }] },
    { say: 'Draw the back: a long curve from the head down to the feet.',
      s: [{ d: 'M172 110C160 140 140 190 130 250C120 320 128 380 150 420' }] },
    { say: 'Draw the round tummy in front, bulging out like a big balloon.',
      s: [{ d: 'M228 145C255 180 285 240 288 300C290 360 270 400 240 420' }] },
    { say: 'Draw the feet, a small tail, and the flipper hanging down on the side.',
      s: [{ d: 'M150 420C165 430 200 434 214 424C224 434 256 434 262 424C256 416 246 416 240 420', w: 5 }, { d: 'M150 420L130 438L162 428' }, { d: 'M160 170C140 230 130 300 140 360C150 340 165 280 172 220C175 195 170 178 160 170Z' }] },
    { say: 'Draw the line where the black back meets the white tummy, and the ear patch behind the eye.',
      s: [{ d: 'M232 150C215 190 200 250 205 320C208 370 220 405 240 420', w: 3.5 }, { d: 'M200 100C210 110 222 125 228 145C218 140 205 125 198 112Z', w: 3.5 }] },
    { say: 'Draw a small eye with a white shine, and a stripe along the beak.',
      s: [{ c: [212, 86, 5], f: 1 }, { c: [213.5, 84.5, 1.8], f: 'w' }, { d: 'M240 111C255 112 270 114 285 117', w: 2.5, t: 1 }] },
    { say: 'Now gently erase your light guide lines.', erase: 1, s: [] },
    { say: 'Shading time! Shade the head and the back very dark. Go around the ear patch and keep it light!',
      s: [{ sh: 3, d: 'M172 110C165 80 180 58 205 58C228 58 240 75 238 95C237 105 236 110 236 116C230 128 226 135 228 145L232 150C215 190 200 250 205 320C208 370 220 405 240 420L150 420C128 380 120 320 130 250C140 190 160 140 172 110ZM200 100C210 110 222 125 228 145C218 140 205 125 198 112Z' }] },
    { say: 'Shade the beak and the flipper a little more, so they stand out.',
      s: [{ sh: 2, d: 'M238 95C255 98 280 108 296 118C278 120 255 118 236 116Z' }, { sh: 2, d: 'M160 170C140 230 130 300 140 360C150 340 165 280 172 220C175 195 170 178 160 170Z' }] },
    { say: 'Shade softly: the ear patch, the top of the chest, and a light shadow along the tummy edge.',
      s: [{ sh: 1, d: 'M200 100C210 110 222 125 228 145C218 140 205 125 198 112Z' }, { sh: 1, d: 'M228 145C242 162 252 180 258 198C240 190 230 172 224 156Z' }, { sh: 1, d: 'M232 150C215 190 200 250 205 320C208 370 220 405 240 420C228 380 222 330 226 270C228 220 238 180 232 150Z' }] },
    { say: 'Draw tiny feather marks on the tummy, then the ice and a shadow on the ground. Amazing work!',
      s: [{ d: 'M240 230q4 4 8 0M258 262q4 4 8 0M236 290q4 4 8 0M262 320q4 4 8 0M240 352q4 4 8 0M258 384q4 4 8 0', w: 2, t: 1 }, { sh: 1, e: [205, 432, 100, 7] }, { d: 'M50 438L360 438' }] },
  ] },
};
for (const [id, level] of Object.entries(MASTER)) ANIMALS.find(a => a.id === id).levels.pro = level;
