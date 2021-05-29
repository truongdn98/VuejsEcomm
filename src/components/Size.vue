<template>
    <div>
        <div>
            <!-- v-bind:class="[classActive(index) ]" -->
            <ul>
              <li
                v-for="(item, index) in sizes"
                v-bind:key="index"
               v-bind:class="[classActive(index)]"

                 @click="selectSize($event,index)"
                class="mt-12"
              >
                {{ item.size }}
                <!-- :class="{ selected: isSelected(item.size) }" -->
                 <!--  -->
              </li>
              
               
              
            </ul>
          </div>
    </div>
</template>

<script>
    export default {
        name: 'Size',
        props:{
            sizes:{
                Type: String,
                default: null
            },
            selectedProduct: {
              Type: Number,
                default: null
            }
        },
        methods:{
            selectSize(e,index) {
      //this.size = size;
      this.$emit("change", e,index);
      console.log(index)
    },
    isSelected(size) {
      return this.size === size;
    },
    classActive(index){
      
      return {
        active: this.selectedProduct === index,
    }
    }
        }
    }
</script>

<style >
li.active {
  background: rgb(3, 3, 3) !important;
}
.product-type {
  padding-left: 15px !important;
}
.product-type ul {
  display: flex;
}
.product-type ul li {
  display: inline;
  background: red;
  padding: 6px 20px;
  margin: 10px 6px 10px 0px;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
}
</style>