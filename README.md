# v-router-transition

[![npm version](https://badge.fury.io/js/v-router-transition.svg)](https://badge.fury.io/js/v-router-transition)

A vue ^2.2.0 awesome vue-router page transitions for your application

## Install
`npm install v-router-transition --save`

OR

`yarn add v-router-transition`

## Options (Props)

### transition
- fade (default)
- slide
- sliding

### mode
- out-in (default)
- in-out

e.t.c.

# Usage
You can either choose to import the component globally or inside a certain component.

### Globally
Define a `Vue.component()` inside your **app.js/main.js**
```js
Vue.component('v-router-transition', require('v-router-transition'));
```

then you can use the component anywhere you choose. Check out the [examples](#examples) for demo usage.

### Locally
Import and include it in the component's `components` property.
```js
// navigation.vue

`import VRouterTransition from 'v-router-transition';`

export default {
    components: {
        VRouterTransition
    },

    ...
}

```

After declaring the component, you should use the component below the
`<router-view></router-view>` in your components.

```js
<v-router-transition transition="slide">
    <router-view></router-view>
</v-router-transition>
```

> Check the [examples](#examples) on how to use it in your template

# Examples
Using the default options, you just need to pass an id and a model
```
<v-router-transition transition="sliding" mode="in-out">
    <router-view></router-view>
</v-router-transition>
```

Laravel/Blade/Vue.js
```php
// sidebar.blade.php

@php
    $route = $navigation['route'];
    $route = isset($navigation['default']) ? route($route, [$navigation['default']]) : route($route);
@endphp

<router-link to="{{ relativeUrl($route) }}" tag="v-list-tile">
    <v-list-tile-content title="{{ relativeUrl($route) }}">
        <v-list-tile-title >
            {{ $link['name'] }}
        </v-list-tile-title>
    </v-list-tile-content>
</router-link>
```

```php
// main.blade.php

@include('layouts.partials.sidebar')

<v-router-transition transition="slide">
    <router-view></router-view>
</v-router-transition>
```

## Contribution
The package has been kept as simple as possible to offer a starting point for your next project. We are looking for more
css page transitions and we would be more than grateful to receive your pull-requests. You can also share a gist containing
the css transition for us to add.

Cheers!

## Credits
- [Lexx YungCarter](https://github.com/lexxyungcarter)
- [maoberlehner](https://github.com/maoberlehner/vue-router-page-transitions)

## Licence
- MIT