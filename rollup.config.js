import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from "rollup-plugin-terser";
import css from 'rollup-plugin-css-only'

export default {
  input: 'src/plugin.js',
  output: {
    file: 'dist/v-router-transition.min.js',
    name: 'v-router-transition',
    sourcemap: false,
    format: 'umd',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    css({ output: 'dist/v-router-transition.min.css'}),
    vue({ css: false }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && terser()),
  ],
};