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

/* =====================================================================
   NEW: drawings made for one level only.
   Every child can still choose them; they always use this level.
   ===================================================================== */
const star = (cx, cy, r) => {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
    d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1);
  }
  return { d: d + 'Z' };
};
const sunRays = (cx, cy, r1, r2, n = 8) => ({
  d: Array.from({ length: n }, (_, i) => {
    const a = i * 2 * Math.PI / n;
    return `M${(cx + r1 * Math.cos(a)).toFixed(1)} ${(cy + r1 * Math.sin(a)).toFixed(1)}L${(cx + r2 * Math.cos(a)).toFixed(1)} ${(cy + r2 * Math.sin(a)).toFixed(1)}`;
  }).join(''),
});

ANIMALS.push(
  /* ------------------------------------------------- FLAMINGO (Little Artist) */
  {
    id: 'flamingo', name: 'Flamingo', emoji: '🦩',
    levels: {
      easy: { view: '30 30 360 390', steps: [
        { say: 'Draw a big egg shape lying down. This is the body.', s: [{ d: 'M150 200C150 160 200 140 260 150C310 158 330 190 320 215C305 245 250 255 200 245C170 238 150 225 150 200Z' }] },
        { say: 'Draw a little circle high up for the head.', s: [{ c: [150, 72, 22] }] },
        { say: 'Draw the long bendy neck with two lines, from the body up to the head.', s: [{ d: 'M156 178C122 150 116 118 139 91' }, { d: 'M177 159C148 140 142 116 161 91' }] },
        { say: 'Draw the beak bending down, with a dark tip.', s: [{ d: 'M130 64C112 64 100 76 98 96C108 88 118 82 131 81' }, { d: 'M98 96C99 88 102 82 107 79L112 85C106 88 102 91 98 96Z', f: 1 }] },
        { say: 'Draw the eye with a little shine.', s: [{ c: [153, 66, 5], f: 1 }, { c: [154.5, 64.5, 1.8], f: 'w' }] },
        { say: 'Draw the wing on the body, with a wavy bottom like feathers.', s: [{ d: 'M195 175C230 155 290 165 312 200C300 208 290 210 282 206C272 214 260 214 252 208C242 216 228 214 220 208C210 212 198 205 195 175' }] },
        { say: 'Add pointy tail feathers at the back.', s: [{ d: 'M318 186L356 184L334 200L358 212L320 214' }] },
        { say: 'Draw one long straight leg, and one leg bent up like the letter Z. Flamingos stand on one leg!', s: [{ d: 'M225 248L225 380' }, { d: 'M245 248L252 300L214 288' }, { c: [225, 314, 4] }] },
        { say: 'Draw the webbed foot at the bottom.', s: [{ d: 'M225 380C210 384 200 390 196 395L254 395C250 390 240 384 225 380Z' }] },
        { say: 'Finish with little waves of water around the foot.', s: [{ d: 'M70 402q15 -8 30 0t30 0t30 0M270 402q15 -8 30 0t30 0t30 0M110 418q15 -8 30 0t30 0M240 418q15 -8 30 0t30 0' }] },
      ] },
    },
  },

  /* -------------------------------------------------- UNICORN (Little Artist) */
  {
    id: 'unicorn', name: 'Unicorn', emoji: '🦄',
    levels: {
      easy: { steps: [
        { say: 'Draw the head, with a round nose at the bottom.', s: [{ d: 'M120 90C150 75 185 90 185 125C185 150 170 165 150 175C130 188 100 192 82 180C66 170 70 150 85 140C95 132 100 110 120 90Z' }] },
        { say: 'Add a pointy ear and the magic horn on top!', s: [{ d: 'M162 88L178 56L177 99' }, { d: 'M124 88L112 22L136 85' }] },
        { say: 'Draw little stripes on the horn to make it twisty.', s: [{ d: 'M121 72L130 68M118.5 57L124.5 54M115.5 41L118.8 39.5', w: 4 }] },
        { say: 'Draw a big eye with a shine, a nostril and a smile.', s: [{ e: [145, 122, 7, 9], f: 1 }, { c: [147, 118, 2.5], f: 'w' }, { d: 'M138 112l-4 -6M144 111l0 -7M150 112l4 -6', w: 3 }, { c: [86, 164, 3.5], f: 1 }, { d: 'M90 182q10 5 20 -2', w: 4 }] },
        { say: 'Draw the neck with two lines going down.', s: [{ d: 'M150 175C158 190 162 205 165 216' }, { d: 'M183 139C200 160 208 180 215 197' }] },
        { say: 'Draw the curly mane along the back of the neck.', s: [{ d: 'M180 100C205 96 212 116 200 124C224 124 226 146 210 152C234 154 234 176 218 180C238 186 236 198 226 199' }] },
        { say: 'Draw a big oval for the body.', s: [{ e: [240, 250, 95, 55] }] },
        { say: 'Draw four legs, like long rectangles.', s: [{ d: 'M168 286L168 362L186 362L186 295M206 301L206 362L224 362L224 304M262 303L262 362L280 362L280 300M300 293L300 362L318 362L318 281' }] },
        { say: 'Draw a line across each leg for the hooves.', s: [{ d: 'M168 348L186 348M206 348L224 348M262 348L280 348M300 348L318 348', w: 4 }] },
        { say: 'Draw a big curly tail.', s: [{ d: 'M333 238C372 228 384 262 362 276C384 288 376 314 350 314C362 302 354 290 340 292C350 280 346 266 334 262' }] },
        { say: 'Add some magic stars around your unicorn!', s: [star(330, 70, 18), star(60, 250, 12), star(285, 130, 9)] },
      ] },
    },
  },

  /* ----------------------------------------------------- TREE (Little Artist) */
  {
    id: 'tree', name: 'Apple Tree', emoji: '🌳',
    levels: {
      easy: { steps: [
        { say: 'Draw a big fluffy cloud shape for the leaves.', s: [{ sc: [200, 160, 110, 13] }] },
        { say: 'Draw little bumpy lines inside, to show bunches of leaves.', s: [{ d: 'M140 150q15 -18 30 0M220 120q15 -18 30 0M170 210q15 -18 30 0M240 190q15 -18 30 0M120 210q15 -18 30 0', w: 4 }] },
        { say: 'Draw the trunk with two lines going down.', s: [{ d: 'M182 268C186 320 184 350 178 380M218 268C214 320 216 350 222 380' }] },
        { say: 'Draw the roots spreading out, and the ground.', s: [{ d: 'M178 380C168 386 155 390 140 393M222 380C232 386 245 390 260 393M50 394L350 394' }] },
        { say: 'Draw a hole in the trunk and some lines for the bark.', s: [{ e: [200, 318, 8, 12] }, { d: 'M190 286l3 16M208 340l-2 18M193 352l2 14', w: 3.5 }] },
        { say: 'Draw round apples in the tree.', s: [{ c: [155, 105, 9] }, { c: [280, 140, 9] }, { c: [205, 160, 9] }, { c: [275, 215, 9] }, { c: [115, 175, 9] }, { c: [215, 235, 9] }] },
        { say: 'Give each apple a little stem.', s: [{ d: 'M155 96l2 -7M280 131l2 -7M205 151l2 -7M275 206l2 -7M115 166l2 -7M215 226l2 -7', w: 3.5 }] },
        { say: 'Draw grass and two little flowers.', s: [{ d: 'M70 394l-4 -12M76 394l2 -14M82 394l6 -10M318 394l-4 -12M324 394l2 -14M330 394l6 -10', w: 3.5 }, { sc: [108, 374, 8, 6] }, { c: [108, 374, 3], f: 1 }, { d: 'M108 382L108 394' }, { sc: [292, 374, 8, 6] }, { c: [292, 374, 3], f: 1 }, { d: 'M292 382L292 394' }] },
        { say: 'Finish with a shining sun in the corner!', s: [{ c: [348, 52, 20] }, sunRays(348, 52, 28, 40)] },
      ] },
    },
  },

  /* ------------------------------------------------ HORSE ✨ (Master only) */
  {
    id: 'horse', name: 'Horse', emoji: '🐴',
    levels: {
      pro: { view: '0 10 420 390', steps: [
        { say: 'Press very lightly! Sketch a circle for the chest, a circle for the back hips, a small circle for the head, and the ground line.',
          s: [{ g: 1, c: [150, 205, 50] }, { g: 1, c: [305, 200, 55] }, { g: 1, e: [66, 120, 38, 48] }, { g: 1, d: 'M85 100L170 160M40 364L380 364' }] },
        { say: 'Draw the long head: from the cheek, round the jaw, along to the soft nose, then up the long straight face to the top.',
          s: [{ d: 'M104 128C108 148 98 160 82 166C70 172 58 180 44 180C32 180 24 172 26 162L58 86C66 70 82 60 98 60' }] },
        { say: 'Add a pointy ear at the top of the head.', s: [{ d: 'M94 62L102 34L112 62' }] },
        { say: 'Draw the strong curved neck with two lines.', s: [{ d: 'M98 60C135 70 160 110 175 150' }, { d: 'M104 128C110 150 112 182 108 200' }] },
        { say: 'Draw the back: a gentle dip, then up and round over the hips.', s: [{ d: 'M175 150C200 160 230 162 260 156C285 150 305 144 325 150C345 156 355 172 356 190' }] },
        { say: 'Draw the chest and the front leg, with a little hoof at the bottom.',
          s: [{ d: 'M108 200C104 218 108 232 118 245C128 262 135 280 138 300L140 342C142 350 142 356 140 364L166 364C164 358 162 352 162 345L162 305C162 290 165 275 170 258' }] },
        { say: 'Draw the belly, then the back leg. It bends backwards at the middle, like a big Z.',
          s: [{ d: 'M170 258C210 268 260 268 290 262C300 275 312 290 318 310L326 342C328 350 326 356 326 364L352 364C348 358 346 352 345 345L338 305C335 290 335 275 340 260C350 240 358 215 356 190' }] },
        { say: 'Draw the other two legs behind, with softer lines.',
          s: [{ d: 'M178 262L184 300L188 342C190 350 190 356 192 362L212 362C210 356 208 350 208 344L200 300L196 264', t: 1 }, { d: 'M270 266C276 285 280 300 284 318L292 346C294 352 294 357 296 362L316 362C312 356 310 352 310 345L304 316', t: 1 }] },
        { say: 'Now gently erase your light guide lines.', erase: 1, s: [] },
        { say: 'Draw the eye, the nostril and the mouth.',
          s: [{ d: 'M64 100C68 94 77 94 81 100C77 105 68 105 64 100Z', f: 1 }, { c: [75, 98, 1.7], f: 'w' }, { d: 'M38 150C32 155 32 162 37 166M28 172C34 175 42 175 48 172', w: 3.5 }] },
        { say: 'Draw the flowing mane with long wavy strands, and a little forelock between the ears.',
          s: [{ d: 'M100 66C112 78 112 90 106 100M114 72C126 86 126 100 118 110M128 82C140 98 140 112 132 122M142 96C154 112 154 126 146 136M156 114C166 128 166 140 160 150M98 62C90 70 86 78 88 88', w: 3.5 }] },
        { say: 'Draw a long, flowing tail with a few hair lines inside.',
          s: [{ d: 'M354 172C380 180 392 220 388 260C386 290 378 310 372 325C368 300 366 280 360 262' }, { d: 'M366 192C376 222 378 258 374 290M360 210C366 236 368 252 366 270', w: 2.5, t: 1 }] },
        { say: 'Add muscle lines: the cheek, the shoulder, the hip, and the knees.',
          s: [{ d: 'M102 126C94 108 80 104 70 112M150 175C140 200 140 225 152 245M300 170C285 190 285 215 300 235M138 300q8 -5 16 0M318 306q8 -5 16 0M140 350L164 350M326 350L350 350', w: 2.5, t: 1 }] },
        { say: 'Shading time! Shade the whole horse very lightly.',
          s: [{ sh: 1, d: 'M44 180C32 180 24 172 26 162L58 86C66 70 82 60 98 60C135 70 160 110 175 150C200 160 230 162 260 156C285 150 305 144 325 150C345 156 355 172 356 190C358 215 350 240 340 260C335 275 335 290 338 305L345 345C346 352 348 358 352 364L326 364C326 356 328 350 326 342L318 310C312 290 300 275 290 262C260 268 210 268 170 258C165 275 162 290 162 305L162 345C162 352 164 358 166 364L140 364C142 356 142 350 140 342L138 300C135 280 128 262 118 245C108 232 104 218 108 200C112 182 110 150 104 128C108 148 98 160 82 166C70 172 58 180 44 180Z' }] },
        { say: 'Shade a bit darker under the belly, under the neck, and on the legs behind.',
          s: [{ sh: 2, d: 'M170 258C210 268 260 268 290 262C280 250 250 245 210 245C190 245 178 250 170 258Z' }, { sh: 2, d: 'M104 128C110 150 112 182 108 200C118 180 118 150 112 132Z' },
            { sh: 2, d: 'M178 262L184 300L188 342C190 350 190 356 192 362L212 362C210 356 208 350 208 344L200 300L196 264Z' }, { sh: 2, d: 'M270 266C276 285 280 300 284 318L292 346C294 352 294 357 296 362L316 362C312 356 310 352 310 345L304 316L290 262Z' }] },
        { say: 'Last step: shade the mane, the tail and the lower legs really dark, and add a shadow on the ground. Magnificent!',
          s: [{ sh: 3, d: 'M98 60C135 70 160 110 175 150C166 140 156 140 160 150C150 136 146 136 146 136C140 124 132 122 132 122C122 110 118 110 118 110C108 100 106 100 106 100C110 88 102 66 98 60Z' },
            { sh: 3, d: 'M354 172C380 180 392 220 388 260C386 290 378 310 372 325C368 300 366 280 360 262C358 240 358 200 354 172Z' },
            { sh: 3, d: 'M138 320L140 342C142 350 142 356 140 364L166 364C164 358 162 352 162 345L162 320Z' }, { sh: 3, d: 'M321 320L326 342C328 350 326 356 326 364L352 364C348 358 346 352 345 345L340 320Z' },
            { sh: 1, e: [245, 367, 150, 7] }] },
      ] },
    },
  },
);

/* ------------------------------------------------ PRINCESS & PRINCE (both levels) */
const P = {
  head: { c: [200, 110, 45] },
  crown: { d: 'M172 75L166 35L186 55L200 28L214 55L234 35L228 75' },
  crownJewels: [{ c: [200, 62, 5], f: 1 }, { c: [182, 66, 3.5], f: 1 }, { c: [218, 66, 3.5], f: 1 }, { c: [166, 33, 4] }, { c: [200, 25, 4] }, { c: [234, 33, 4] }],
  hair: [{ d: 'M160 90C140 115 128 150 132 190C140 194 148 192 154 186C152 165 155 148 163 135' }, { d: 'M240 90C260 115 272 150 268 190C260 194 252 192 246 186C248 165 245 148 237 135' }, { d: 'M160 96Q180 74 200 88Q220 74 240 96' }],
  hairStrands: { d: 'M146 120C140 140 138 160 140 180M254 120C260 140 262 160 260 180', w: 3, t: 1 },
  eyes: [{ e: [184, 112, 6, 7], f: 1 }, { e: [216, 112, 6, 7], f: 1 }],
  shine: [{ c: [186, 109, 2], f: 'w' }, { c: [218, 109, 2], f: 'w' }],
  smile: { d: 'M188 132Q200 142 212 132' },
  cheeks: [{ c: [172, 128, 6], sh: 1 }, { c: [228, 128, 6], sh: 1 }],
  lashes: { d: 'M178 106l-5 -4M182 104l-2 -5M218 104l2 -5M222 106l5 -4', w: 3 },
  nose: { d: 'M199 120q3 4 0 6', w: 3 },
  neck: { d: 'M193 154L193 162M207 154L207 162' },
  bodice: { d: 'M184 160Q200 168 216 160L212 215L188 215Z' },
  sleeves: [{ d: 'M184 160C166 156 158 174 166 188C172 188 178 184 183 178' }, { d: 'M216 160C234 156 242 174 234 188C228 188 222 184 217 178' }],
  arms: [{ d: 'M166 188L132 222M180 182L140 230' }, { c: [130, 231, 9] }, { d: 'M234 188L268 222M220 182L260 230' }, { c: [270, 231, 9] }],
  skirt: { d: 'M188 215C165 250 130 320 110 368Q200 382 290 368C270 320 235 250 212 215' },
  shoes: { d: 'M166 376C166 392 194 392 194 377M206 377C206 392 234 392 234 376' },
  wand: [{ d: 'M274 223L300 160', w: 5 }, star(304, 146, 17)],
  hem: { d: 'M118 352Q132 340 146 356Q160 342 174 360Q188 346 200 362Q212 346 226 360Q240 342 254 356Q268 340 282 352', w: 4 },
  dots: [{ c: [165, 300, 4], f: 1 }, { c: [200, 280, 4], f: 1 }, { c: [235, 300, 4], f: 1 }, { c: [182, 250, 4], f: 1 }, { c: [218, 250, 4], f: 1 }, { c: [200, 320, 4], f: 1 }],
  dotsHard: [{ c: [182, 250, 4], f: 1 }, { c: [218, 250, 4], f: 1 }, { c: [200, 272, 4], f: 1 }, { c: [160, 326, 4], f: 1 }, { c: [200, 330, 4], f: 1 }, { c: [240, 326, 4], f: 1 }],
  ruffle: { d: 'M150 290Q160 300 172 292Q186 302 200 293Q214 302 228 292Q240 300 250 290', w: 4 },
  laces: { d: 'M192 172L208 180M208 172L192 180M192 186L208 194M208 186L192 194M192 200L208 208M208 200L192 208', w: 2.5, t: 1 },
  necklace: [{ d: 'M190 158Q200 168 210 158', w: 3 }, { c: [200, 167, 3.5], f: 1 }],
  skirtShade: { sh: 1, d: 'M188 215C165 250 130 320 110 368Q200 382 290 368C270 320 235 250 212 215Z' },
  sparkles: [star(80, 90, 10), star(330, 250, 12), star(70, 290, 8)],
};
const K = {
  head: { c: [200, 105, 42] },
  crown: { d: 'M168 78L168 40L184 58L200 36L216 58L232 40L232 78Z' },
  crownJewels: [{ c: [200, 66, 5], f: 1 }, { c: [182, 70, 3.5], f: 1 }, { c: [218, 70, 3.5], f: 1 }, { c: [168, 38, 4], f: 1 }, { c: [200, 34, 4], f: 1 }, { c: [232, 38, 4], f: 1 }],
  hair: [{ d: 'M166 82Q178 98 190 84Q202 98 214 84Q226 98 234 82' }, { d: 'M162 86C158 96 158 108 160 118M238 86C242 96 242 108 240 118' }],
  ears: [{ d: 'M159 102C150 100 148 114 160 118' }, { d: 'M241 102C250 100 252 114 240 118' }],
  eyes: [{ c: [185, 106, 5.5], f: 1 }, { c: [215, 106, 5.5], f: 1 }],
  shine: [{ c: [187, 104, 1.8], f: 'w' }, { c: [217, 104, 1.8], f: 'w' }],
  brows: { d: 'M176 94q9 -5 18 0M206 94q9 -5 18 0', w: 3.5 },
  smile: { d: 'M188 124Q200 134 212 124' },
  nose: { d: 'M199 112q3 4 0 6', w: 3 },
  neck: { d: 'M193 146L193 152M207 146L207 152' },
  jacket: { d: 'M178 152Q200 160 222 152L226 258L174 258Z' },
  arms: [{ d: 'M178 152C162 152 154 160 152 172L144 240M166 182L160 240' }, { c: [152, 248, 9] }, { d: 'M222 152C238 152 246 160 248 172L256 240M234 182L240 240' }, { c: [248, 248, 9] }],
  belt: [{ d: 'M174 228L226 228M174 240L226 240' }, { d: 'M192 226L208 226L208 242L192 242Z' }],
  buttons: [{ c: [200, 172, 3.5], f: 1 }, { c: [200, 192, 3.5], f: 1 }, { c: [200, 212, 3.5], f: 1 }],
  legs: { d: 'M180 258L180 336M198 258L198 336M202 258L202 336M220 258L220 336' },
  boots: [{ d: 'M178 336L200 336L200 368L168 368Q168 358 178 355Z' }, { d: 'M200 336L222 336L222 355Q232 358 232 368L200 368' }],
  cape: [{ d: 'M146 256C138 280 132 305 128 330L180 330' }, { d: 'M254 256C262 280 268 305 272 330L220 330' }],
  collar: [{ d: 'M180 152C170 140 166 128 162 120' }, { d: 'M220 152C230 140 234 128 238 120' }],
  epaulettes: [{ d: 'M156 160Q166 150 180 154', w: 5 }, { d: 'M156 162l-2 10M162 158l-1 11M168 156l0 11', w: 3 }, { d: 'M244 160Q234 150 220 154', w: 5 }, { d: 'M244 162l2 10M238 158l1 11M232 156l0 11', w: 3 }],
  sash: { d: 'M180 156L226 222M176 166L216 226', w: 4 },
  sword: [{ d: 'M248 258L248 336L252 346L256 336L256 258', w: 4 }, { d: 'M238 258L266 258', w: 5 }],
  bootCuffs: { d: 'M178 346L200 346M200 346L222 346', w: 4 },
  capeShade: [{ sh: 2, d: 'M146 256C138 280 132 305 128 330L180 330L180 258L174 258L160 256Z' }, { sh: 2, d: 'M254 256C262 280 268 305 272 330L220 330L220 258L226 258L240 256Z' }],
  sparkles: [star(90, 60, 10), star(320, 80, 12)],
};
ANIMALS.push(
  {
    id: 'princess', name: 'Princess', emoji: '👸',
    levels: {
      easy: { steps: [
        { say: 'Draw a big circle for the princess’s head.', s: [P.head] },
        { say: 'Draw a pointy crown on top, with three points.', s: [P.crown] },
        { say: 'Draw her long hair on both sides, and a wavy fringe.', s: P.hair },
        { say: 'Draw two eyes, a big smile and round cheeks.', s: [...P.eyes, ...P.shine, P.smile, ...P.cheeks] },
        { say: 'Draw a little neck and the top of her dress.', s: [P.neck, P.bodice] },
        { say: 'Add two puffy sleeves on the shoulders.', s: P.sleeves },
        { say: 'Draw a big, wide skirt, like a bell.', s: [P.skirt] },
        { say: 'Draw her arms and round hands.', s: P.arms },
        { say: 'Draw a magic wand with a star in her hand!', s: P.wand },
        { say: 'Finish with little shoes and dots on the dress.', s: [P.shoes, ...P.dots] },
      ] },
      hard: { steps: [
        { say: 'Draw a circle for the head.', s: [P.head] },
        { say: 'Draw the crown with three points, and little jewels.', s: [P.crown, ...P.crownJewels] },
        { say: 'Draw the long hair falling on both sides, the fringe, and a few hair lines.', s: [...P.hair, P.hairStrands] },
        { say: 'Draw the eyes with a shine, and tiny eyelashes.', s: [...P.eyes, ...P.shine, P.lashes] },
        { say: 'Draw a little nose, a smile and rosy cheeks.', s: [P.nose, P.smile, ...P.cheeks] },
        { say: 'Draw the neck and the top of the dress, with a necklace.', s: [P.neck, P.bodice, ...P.necklace] },
        { say: 'Draw criss-cross laces on the top of the dress.', s: [P.laces] },
        { say: 'Add two puffy sleeves.', s: P.sleeves },
        { say: 'Draw the arms and hands.', s: P.arms },
        { say: 'Draw the big bell skirt.', s: [P.skirt] },
        { say: 'Draw a wavy ruffle in the middle and a wavy line near the bottom.', s: [P.ruffle, P.hem] },
        { say: 'Draw the shoes peeking out, and dots on the skirt.', s: [P.shoes, ...P.dotsHard] },
        { say: 'Draw the magic wand, and lightly shade the skirt.', s: [...P.wand, P.skirtShade] },
        { say: 'Add some sparkles around her. Your princess is ready for the ball!', s: P.sparkles },
      ] },
    },
  },
  {
    id: 'prince', name: 'Prince', emoji: '🤴',
    levels: {
      easy: { view: '10 10 380 380', steps: [
        { say: 'Draw a big circle for the prince’s head.', s: [K.head] },
        { say: 'Draw a crown on top, with three points.', s: [K.crown] },
        { say: 'Draw his short wavy hair and two ears.', s: [...K.hair, ...K.ears] },
        { say: 'Draw two eyes and a happy smile.', s: [...K.eyes, ...K.shine, K.smile] },
        { say: 'Draw a little neck and his jacket, like a long box.', s: [K.neck, K.jacket] },
        { say: 'Draw his arms and round hands.', s: K.arms },
        { say: 'Draw a belt with a square buckle, and three buttons.', s: [...K.belt, ...K.buttons] },
        { say: 'Draw two long legs.', s: [K.legs] },
        { say: 'Draw his big boots.', s: K.boots },
        { say: 'Finish with a royal cape behind him!', s: K.cape },
      ] },
      hard: { view: '10 10 380 380', steps: [
        { say: 'Draw a circle for the head.', s: [K.head] },
        { say: 'Draw the crown with three points, and jewels on it.', s: [K.crown, ...K.crownJewels] },
        { say: 'Draw the wavy hair and the ears.', s: [...K.hair, ...K.ears] },
        { say: 'Draw the eyes with a shine, and the eyebrows.', s: [...K.eyes, ...K.shine, K.brows] },
        { say: 'Draw a little nose and a smile.', s: [K.nose, K.smile] },
        { say: 'Draw the neck and the jacket.', s: [K.neck, K.jacket] },
        { say: 'Draw the arms and hands.', s: K.arms },
        { say: 'Draw shoulder pads with little tassels.', s: K.epaulettes },
        { say: 'Draw a sash across his chest, and three buttons.', s: [K.sash, { c: [200, 170, 3.5], f: 1 }, { c: [200, 214, 3.5], f: 1 }] },
        { say: 'Draw the belt with its buckle.', s: K.belt },
        { say: 'Draw the legs, and the boots with a line at the top.', s: [K.legs, ...K.boots, K.bootCuffs] },
        { say: 'Draw a sword hanging from his hand.', s: K.sword },
        { say: 'Draw the cape behind him with its tall collar, and shade it.', s: [...K.cape, ...K.collar, ...K.capeShade] },
        { say: 'Add some sparkles. Long live the prince!', s: K.sparkles },
      ] },
    },
  },
);

/* =====================================================================
   MORE MASTER DRAWINGS ✨ (Fish, Turtle, Lion)
   ===================================================================== */
/** Flame-shaped mane tufts around a centre, swirling a little. */
function maneTufts(cx, cy, r1, r2, n) {
  const P = (r, a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  const st = 2 * Math.PI / n;
  let d = `M${P(r1, 0)}`;
  for (let i = 0; i < n; i++) {
    const a = i * st;
    d += `Q${P(r2 * 0.95, a + st * 0.15)} ${P(r2, a + st * 0.7)}Q${P(r1 * 1.08, a + st * 0.75)} ${P(r1, a + st)}`;
  }
  return { d: d + 'Z' };
}
const FISH_BODY = 'M80 205C110 160 190 140 250 155C280 162 300 175 312 190L312 226C295 245 250 265 190 262C130 258 95 235 80 205Z';
const FISH_SPOTS = [[175, 182, 7], [205, 176, 4], [232, 180, 8], [262, 184, 4], [288, 196, 5], [172, 202, 3], [198, 205, 9], [228, 210, 5], [256, 210, 8], [283, 216, 4], [212, 238, 4], [240, 238, 7], [268, 232, 5], [158, 186, 3], [300, 207, 3], [226, 254, 3]];
const MASTER2 = {
  /* ----------------------------------------------------------- FISH ✨ */
  fish: { view: '20 40 390 360', steps: [
    { say: 'Press very lightly! Sketch a long oval for the body and a line through the middle, from the nose to the tail.',
      s: [{ g: 1, e: [196, 208, 118, 58] }, { g: 1, d: 'M60 208L395 208' }] },
    { say: 'Draw the body: start at the pointy nose, round over the back to the tail, then round under the belly back to the nose. Leave the tail end open.',
      s: [{ d: 'M312 190C300 175 280 162 250 155C190 140 110 160 80 205C95 235 130 258 190 262C250 265 295 245 312 226' }, { d: 'M80 205C90 212 100 214 112 210', w: 4 }] },
    { say: 'Draw a big round tail fan at the back, like a hand fan.',
      s: [{ d: 'M312 190C330 170 350 150 372 140C396 165 400 255 372 280C350 268 330 248 312 226' }] },
    { say: 'Draw the tall fin on the back. It curves up to a point, then comes straight down.',
      s: [{ d: 'M185 148C212 132 236 102 250 74C262 96 262 130 256 157' }] },
    { say: 'Draw the fin under the belly, and the small side fin behind the head.',
      s: [{ d: 'M200 261C210 282 226 296 244 302C250 286 252 270 248 256' }, { d: 'M150 222Q172 206 194 216Q186 226 194 236Q176 238 182 250Q160 244 150 222Z' }] },
    { say: 'Draw the gill line, a curve behind the head, and a round eye with a ring around it.',
      s: [{ d: 'M142 166C158 192 158 228 140 252' }, { c: [116, 192, 12], w: 4 }, { c: [116, 192, 6], f: 1 }, { c: [118, 190, 2], f: 'w' }] },
    { say: 'Now gently erase your light guide lines.', erase: 1, s: [] },
    { say: 'Draw thin lines in all the fins, spreading out like rays.',
      s: [{ d: 'M318 202L372 152M318 207L386 180M318 211L392 212M318 215L386 244M318 220L372 268M212 140L246 88M228 150L252 96M242 155L256 112M210 266L238 296M222 264L244 292M234 262L247 282M160 224L190 220M164 232L188 232M168 240L182 246', w: 2.5, t: 1 }] },
    { say: 'Draw lots of spots on the body, some big and some small. Fill them in dark.',
      s: FISH_SPOTS.map(([x, y, r]) => ({ c: [x, y, r], f: 1 })) },
    { say: 'Leave a tiny white shine in the biggest spots, and draw a thin line along the side of the fish.',
      s: [...FISH_SPOTS.filter(s => s[2] >= 7).map(([x, y, r]) => ({ c: [x - r * 0.3, y - r * 0.3, r * 0.35], f: 'w' })), { d: 'M150 200C200 196 260 198 308 206', w: 2, t: 1 }] },
    { say: 'Draw bubbles coming up from the mouth: a big one, a middle one and a little one.',
      s: [{ c: [92, 92, 30] }, { c: [150, 140, 18] }, { c: [80, 160, 9] }] },
    { say: 'Shading time! Shade the whole fish very lightly.', s: [{ sh: 1, d: FISH_BODY }] },
    { say: 'Shade darker along the back and under the belly, so the fish looks round. Keep the middle light!',
      s: [{ sh: 1, d: 'M80 205C110 160 190 140 250 155C280 162 300 175 312 190L312 196C280 180 220 168 160 176C120 182 96 196 80 205Z' },
        { sh: 2, d: 'M80 205C95 235 130 258 190 262C250 265 295 245 312 226L312 220C280 236 230 248 180 244C130 240 100 226 80 205Z' }] },
    { say: 'Shade the fins and the tail, darker near the body.',
      s: [{ sh: 2, d: 'M312 190C330 170 350 150 372 140C396 165 400 255 372 280C350 268 330 248 312 226Z' }, { sh: 2, d: 'M185 148C212 132 236 102 250 74C262 96 262 130 256 157C230 150 205 146 185 148Z' },
        { sh: 2, d: 'M200 261C210 282 226 296 244 302C250 286 252 270 248 256C232 260 216 262 200 261Z' }, { sh: 2, d: 'M150 222Q172 206 194 216Q186 226 194 236Q176 238 182 250Q160 244 150 222Z' },
        { sh: 1, d: 'M312 190L312 226C320 215 322 200 312 190Z' }] },
    { say: 'Last step: shade the bubbles, and leave a little white shine on each one. A real master fish!',
      s: [{ sh: 2, c: [92, 92, 30] }, { sh: 2, c: [150, 140, 18] }, { sh: 3, c: [80, 160, 9] }, { c: [82, 80, 7], f: 'w' }, { c: [144, 133, 4], f: 'w' }] },
  ] },

  /* --------------------------------------------------------- TURTLE ✨ */
  turtle: { view: '10 50 400 330', steps: [
    { say: 'Press lightly! Sketch half a big oval for the shell, a small circle for the head, and the ground line.',
      s: [{ g: 1, d: 'M50 232A135 125 0 0 1 320 232Z' }, { g: 1, c: [372, 168, 24] }, { g: 1, d: 'M30 300L400 300' }] },
    { say: 'Draw the tall, round shell like a dome.', s: [{ d: 'M60 230C66 150 130 106 190 106C255 106 312 150 318 230' }] },
    { say: 'Draw the rim of the shell: a thick band along the bottom.', s: [{ d: 'M50 230L330 230C334 244 324 252 312 252L68 252C56 252 46 244 50 230Z' }] },
    { say: 'Draw the head and the long neck coming out of the shell.',
      s: [{ d: 'M318 205C334 190 344 178 350 166C358 148 384 146 394 160C402 174 396 188 384 193C368 199 352 214 336 240' }] },
    { say: 'Draw the front leg and the back leg, thick and strong, with little toes.',
      s: [{ d: 'M278 252C282 272 286 288 288 300L318 300C314 286 308 270 304 252' }, { d: 'M290 300q4 -6 8 0q4 -6 8 0q4 -6 8 0', w: 3.5 },
        { d: 'M92 252C90 270 88 286 84 300L114 300C114 286 118 270 120 252' }, { d: 'M86 300q4 -6 8 0q4 -6 8 0q4 -6 8 0', w: 3.5 }] },
    { say: 'Draw the two legs on the other side with softer lines, and a little pointy tail.',
      s: [{ d: 'M228 252L232 292L254 292L252 252M138 252L136 290L158 290L160 252', t: 1 }, { d: 'M50 238L28 250L54 248' }] },
    { say: 'Draw the eye with a shine, a little brow, the nostril and the mouth.',
      s: [{ c: [374, 164, 5], f: 1 }, { c: [375.5, 162.5, 1.8], f: 'w' }, { d: 'M366 156q8 -6 16 0', w: 3 }, { c: [394, 166, 1.8], f: 1 }, { d: 'M397 176C390 182 380 183 370 180', w: 3.5 }] },
    { say: 'Now gently erase your light guide lines.', erase: 1, s: [] },
    { say: 'Draw a big six-sided plate in the middle of the shell.', s: [{ d: 'M160 136L216 136L236 168L216 200L160 200L140 168Z' }] },
    { say: 'Draw lines from each corner out to the edge of the shell, to make more plates.',
      s: [{ d: 'M160 136L142 112M216 136L236 112M236 168L300 160M216 200L240 230M160 200L138 230M140 168L74 168M74 168L90 230M300 160L292 230' }] },
    { say: 'Draw smaller shapes inside each plate, and short lines dividing the rim.',
      s: [{ d: 'M172 150L206 150L218 168L206 186L172 186L160 168Z', w: 2.5, t: 1 }, { d: 'M90 230L90 252M120 230L120 252M150 230L150 252M180 230L180 252M210 230L210 252M240 230L240 252M270 230L270 252M300 230L300 252', w: 3 }] },
    { say: 'Add little scales on the head, neck and legs: tiny circles and dots.',
      s: [{ d: 'M352 180a4 4 0 1 0 0.1 0M340 200a4 4 0 1 0 0.1 0M290 270a4 4 0 1 0 0.1 0M298 286a3 3 0 1 0 0.1 0M100 270a4 4 0 1 0 0.1 0M106 286a3 3 0 1 0 0.1 0M382 154a3 3 0 1 0 0.1 0', w: 2.5, t: 1 }] },
    { say: 'Shading time! Shade the whole shell lightly, and the plate edges a bit darker.',
      s: [{ sh: 1, d: 'M60 230C66 150 130 106 190 106C255 106 312 150 318 230Z' }, { sh: 1, d: 'M60 230C66 150 130 106 190 106C150 120 110 160 96 230Z' }] },
    { say: 'Shade the rim, the head, the neck and the legs.',
      s: [{ sh: 2, d: 'M50 230L330 230C334 244 324 252 312 252L68 252C56 252 46 244 50 230Z' },
        { sh: 1, d: 'M318 205C334 190 344 178 350 166C358 148 384 146 394 160C402 174 396 188 384 193C368 199 352 214 336 240L318 230Z' },
        { sh: 1, d: 'M278 252C282 272 286 288 288 300L318 300C314 286 308 270 304 252Z' }, { sh: 1, d: 'M92 252C90 270 88 286 84 300L114 300C114 286 118 270 120 252Z' },
        { sh: 2, d: 'M228 252L232 292L254 292L252 252Z' }, { sh: 2, d: 'M138 252L136 290L158 290L160 252Z' }] },
    { say: 'Last step: a dark shadow under the shell and on the ground, and some grass. Slow and steady wins!',
      s: [{ sh: 3, d: 'M68 252L312 252L304 262L80 262Z' }, { sh: 2, e: [200, 302, 170, 8] }, { d: 'M40 300l-3 -12M46 300l2 -14M52 300l5 -10M356 300l-3 -12M362 300l2 -14M368 300l5 -10', w: 3 }] },
  ] },

  /* ----------------------------------------------------------- LION ✨ */
  lion: { view: '20 20 360 370', steps: [
    { say: 'Press lightly! Sketch a circle for the head, a big circle around it for the mane, and a cross for the face.',
      s: [{ g: 1, c: [200, 205, 90] }, { g: 1, c: [200, 200, 155] }, { g: 1, d: 'M200 110L200 300M110 195L290 195' }] },
    { say: 'Draw the face: a wide forehead, round cheeks, and a narrow chin.',
      s: [{ d: 'M200 120C250 120 282 146 286 188C290 232 266 272 236 292C222 301 210 305 200 305C190 305 178 301 164 292C134 272 110 232 114 188C118 146 150 120 200 120Z' }] },
    { say: 'Draw two small round ears on top, with a curve inside.',
      s: [{ d: 'M142 142C122 118 136 92 162 104C168 108 172 114 174 122' }, { d: 'M258 142C278 118 264 92 238 104C232 108 228 114 226 122' }, { d: 'M148 132C142 120 148 110 160 114M252 132C258 120 252 110 240 114', w: 3 }] },
    { say: 'Draw the big wild mane all around, with pointy tufts like flames.',
      s: [maneTufts(200, 200, 128, 168, 18)] },
    { say: 'Draw the eyes: almond shapes with a round iris, a pupil and a shine.',
      s: [{ d: 'M150 190C160 176 182 176 190 190C182 200 160 202 150 190Z' }, { d: 'M250 190C240 176 218 176 210 190C218 200 240 202 250 190Z' }, { c: [171, 189, 7], f: 1 }, { c: [229, 189, 7], f: 1 }, { c: [173, 186, 2.2], f: 'w' }, { c: [231, 186, 2.2], f: 'w' }] },
    { say: 'Draw the strong brows above the eyes, and the nose: two lines going down to a wide nose.',
      s: [{ d: 'M144 178C156 164 176 162 190 170M256 178C244 164 224 162 210 170', w: 4 }, { d: 'M190 200C188 212 184 222 178 230M210 200C212 212 216 222 222 230', w: 3, t: 1 }, { d: 'M176 230L224 230C224 242 212 250 200 252C188 250 176 242 176 230Z' }] },
    { say: 'Draw the mouth below the nose, two round puffy cheeks, and the chin.',
      s: [{ d: 'M200 252L200 262C192 278 168 280 158 264M200 262C208 278 232 280 242 264' }, { d: 'M180 290C192 296 208 296 220 290', w: 4 }] },
    { say: 'Now gently erase your light guide lines.', erase: 1, s: [] },
    { say: 'Draw whisker dots on the cheeks, and a few long whiskers.',
      s: [{ c: [176, 262, 2], f: 1 }, { c: [168, 268, 2], f: 1 }, { c: [180, 272, 2], f: 1 }, { c: [224, 262, 2], f: 1 }, { c: [232, 268, 2], f: 1 }, { c: [220, 272, 2], f: 1 },
        { d: 'M160 270C135 266 112 268 90 276M162 278C140 282 120 290 102 302M240 270C265 266 288 268 310 276M238 278C260 282 280 290 298 302', w: 2 }] },
    { say: 'Draw lots of hair lines in the mane, going out from the face.',
      s: [ringStrokes(200, 205, 100, 110, 0, 350, 36, 26), ringStrokes(200, 200, 130, 140, 5, 355, 36, 14)] },
    { say: 'Shading time! Shade the whole face lightly. Keep the muzzle and chin light.',
      s: [{ sh: 1, d: 'M200 120C250 120 282 146 286 188C290 232 266 272 236 292C222 301 210 305 200 305C190 305 178 301 164 292C134 272 110 232 114 188C118 146 150 120 200 120ZM200 252C188 250 176 242 176 230C166 240 150 250 156 266C164 282 190 282 200 262C210 282 236 282 244 266C250 250 234 240 224 230C224 242 212 250 200 252Z' }] },
    { say: 'Shade the mane medium all around.',
      s: [{ sh: 2, d: maneTufts(200, 200, 128, 168, 18).d + 'M200 120C150 120 118 146 114 188C110 232 134 272 164 292C178 301 190 305 200 305C210 305 222 301 236 292C266 272 290 232 286 188C282 146 250 120 200 120Z' }] },
    { say: 'Shade darker where the mane meets the face, and inside the ears.',
      s: [{ sh: 2, d: 'M200 120C250 120 282 146 286 188C290 232 266 272 236 292C222 301 210 305 200 305C190 305 178 301 164 292C134 272 110 232 114 188C118 146 150 120 200 120ZM200 106C260 106 302 140 304 190C306 245 270 292 238 310C222 318 210 322 200 322C190 322 178 318 162 310C130 292 94 245 96 190C98 140 140 106 200 106Z' },
        { sh: 2, d: 'M148 132C142 120 148 110 160 114C166 118 168 124 170 128Z' }, { sh: 2, d: 'M252 132C258 120 252 110 240 114C234 118 232 124 230 128Z' }] },
    { say: 'Last step: shade the nose very dark, and the brows. King of the jungle!',
      s: [{ sh: 3, d: 'M176 230L224 230C224 242 212 250 200 252C188 250 176 242 176 230Z' }, { sh: 2, d: 'M144 178C156 164 176 162 190 170C176 168 158 170 144 178ZM256 178C244 164 224 162 210 170C224 168 242 170 256 178Z' }] },
  ] },
};
for (const [id, level] of Object.entries(MASTER2)) ANIMALS.find(a => a.id === id).levels.pro = level;
