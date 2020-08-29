<template>
    <div :id="id" v-show="!enough">
        <slot>
            <!-- We can add an SR only text for screen readers by passing class to these slot or add a spinner ico-->
            <span> Loading...</span>
        </slot>
    </div>
</template>

<script>
export default {
  name: "InfiniteScroll",
  props: {
    id: {
      default: "load-more",
    },
    offset: {
      default: 0,
    },
    enough: {
      default: false,
    },
  },
  methods: {
    handleScroll() {
      if (this.enough) return;

      //==============with jquery
      // let element_toTop = $('#load-more').offset().top;
      // let current_distance = $('html,body').scrollTop() + window.innerHeight;
      //=========================

      let element_toTop = this.getElementOffset().top;
      let current_distance =
        document.documentElement.scrollTop + window.innerHeight;
      current_distance + this.offset > element_toTop && this.$emit("load-more");
    },
    getElementOffset() {
      let top = 0;
      let left = 0;
      let element = document.getElementById(this.id);

      // Loop through the DOM tree
      // and add it's parent's offset to get page offset
      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top,
        left,
      };
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};

</script>
