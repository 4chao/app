// import tokens from '../declare/tokens.d.json'
// import { set, forIn } from 'lodash'

// const PREFIX = 'sc'
// const rawData = deepFirstSearch(tokens)

// // rules: [
// //     ['m-1', { margin: '0.25rem' }],
// //   ]
// const rules = [] as any

// //   colors: {
// //     'veryCool': '#0000ff', // class="text-very-cool"
// //     'brand': {
// //       'primary': 'hsla(var(--hue, 217), 78%, 51%)', //class="bg-brand-primary"
// //     }
// //   }
// const colors = {}
// rawData.filter(e => e.type === 'color').forEach(e => set(colors, e.key, e.value))

// function deepFirstSearch(node, nodeList = [], keys = []) {
//   if (node.type) {
//     nodeList.push({ ...node, key: keys.join('.') })
//   } else {
//     forIn(node, (node, key) => {
//       deepFirstSearch(node, nodeList, [...keys, key])
//     })
//   }
//   return nodeList
// }

// export { rules, colors }
