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
