declare module 'vue-the-mask' {
    import { App, Plugin } from 'vue'

    export const mask: {
        bind: Function
        update: Function
        unbind: Function
    }

    export const tokens: {
        '#': { pattern: RegExp }
        'X': { pattern: RegExp }
        'S': { pattern: RegExp }
        'A': { pattern: RegExp }
        'a': { pattern: RegExp }
        '0': { pattern: RegExp }
        '9': { pattern: RegExp }
        '*': { pattern: RegExp }
    }

    export const TheMask: Plugin

    export function install(app: App): void

    export default TheMask
}