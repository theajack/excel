
<template>
    <div>
        <el-tag
            :key="tag"
            v-for="tag in tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
    </div>
</template>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px!important;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px!important;
    display: inline-block;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
export default {
    props: {
        tags: {
            type: Array,
            required: true,
        }
    },
    data () {
        return {
            inputVisible: false,
            inputValue: ''
        };
    },
    methods: {
        handleClose (tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },

        showInput () {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm () {
            const inputValue = this.inputValue;
            if (inputValue) {
                this.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    }
};
</script>