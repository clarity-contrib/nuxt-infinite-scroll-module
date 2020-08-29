# nuxt-facebook-pixel-module



> A NuxtJS module for inifinte scroll pagination for your app

## Table of Contents

* [Requirements](#requirements)
* [Install](#install)
* [Getting Started](#getting-started)
* [License](#license)

## Requirements

* npm or yarn
* NuxtJS
* NodeJS

## Install


1. Add `@forked-prs/nuxt-infinite-scroll-module` dependency to your project

```bash
yarn add @forked-prs/nuxt-infinite-scroll-module # or npm install @forked-prs/nuxt-infinite-scroll-module
```

## Getting Started

2. Add `@forked-prs/nuxt-infinite-scroll-module` to the `modules` section of `nuxt.config.js`

```js
export default {
  modules: [
    '@forked-prs/nuxt-infinite-scroll-module'
  ]
}
```



## Usage


```Bash
<template>
    <div>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <InfiniteScroll :enough="enough" @load-more="getData()" />
        </ul>
    </div>
</template>

<script>
    data(){
        return{
            dataArray: [],
            ...
            //=======infiniteScroll
            enough: false,
            page: 1,
            pageSize: 10,
            //=====================
            ...
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        ...
        //=======infiniteScroll
        async getData(){
            try{
                let result = await this.$axios.$get(`my-api-url?page=${this.page++}`);
                if(result.success == 'true'){
                    this.dataArray = this.dataArray.concat(result.data);
                    // Stop scroll-loader
                    result.data.length < this.pageSize && (this.enough = true);
                }
            }catch(error){
               console.log('error', error)
            }
        },
        //=====================
        ...
    }
</script>
```

A project using tailwind example
```
<infinite-scroll
:enough="false"
class="flex justify-center w-full h-40"
@load-more="loadManual"
>
<template>
    <svg
    class="w-8 h-8 mr-3 border-0 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
    <span class="sr-only"> Loading...</span>
</template>
</infinite-scroll>
```

# Options
| Option | Description |
| ----- | ----- |
| :id | set an id for loader element. |
| :enough | flag to visible loader or hide. |
| :offset | add offset to current page scroll position, before reach loader position. |

# Event
@load-more: When page current scroll position reached loader position, will emit this event.

## License

[MIT License](./LICENSE)
