<template>
  <div>
    <el-upload
      :action="uploadAction"
      :data="uploadParams"
      :on-preview="handlePictureCardPreview"
      :before-remove="beforeRemove"
      :on-success="handleAvatarSuccess"
      :file-list="uploadAttachmentList">
      <el-button size="small" type="primary" :disabled="uploadParams.disable">上传</el-button>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <button
        type="button"
        class="el-dialog__headerbtn"
        style="margin-right: 30px"
        aria-label="Rotate"
        @click="handleRotate">
        <img src="../common/image/预览-旋转.svg" style="width: 16px; height: 16.8px"/>
      </button>
      <el-carousel indicator-position="outside" height="65vh" :autoplay="false" @change="carouselChange">
        <el-carousel-item v-for="item in uploadAttachmentList" :key="item.title" ref="carouselItem">
          <img :src="item.url" alt="" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  import _ from 'underscore'

  export default {
    name: 'Upload',

    data() {
      return {
        uploadAction: window.SERVE_URl + 'upload',
        dialogVisible: false,
        dialogImageUrl: '',
        currentRotate: 0,
        uploadAttachmentList: []
      }
    },

    props: {
      uploadParams: {
        report_no: '',
        userName: '',
        tokens: '',
        company_code: '',
        attachmentType: '',
        disable: false,
        preview: true
      },

      attachmentType: '',

      attachmentList: {
        type: Array,
        default: []
      },
    },

    mounted () {
      if (this.attachmentType) {
        this.uploadParams.attachmentType = this.attachmentType;
      }
      this.initUploadAttachmentList();
    },

    methods: {
      loading(text) {
        return this.$loading({
          lock: true,
          text: text,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },

      carouselChange(index){
        var item = this.uploadAttachmentList[index];
        if (!item.url) {
          var _self = this;
          this.viewImgBase64UrlFn(item.id, function (url) {
            _self.$set(_self.uploadAttachmentList[index], 'url', url);
          });
        }
      },

      handleRotate() {
        var activeItem = _.findWhere(this.$refs.carouselItem, {active: true});
        if (!activeItem) return;

        this.currentRotate += 90;
        activeItem.$el.children[0].style.transform = 'rotate(' + this.currentRotate + 'deg)';
      },

      viewImgBase64(id) {
        const url = window.SERVE_URl + 'viewImgBase64';
        var ld = this.loading('查询图片中…');
        var params = _.clone(this.uploadParams);
        params.fileid = id;
        this.$http.post(url, params).then(res => {
          ld.close();

          if (res.data.status == 'ok') {
            this.dialogImageUrl = 'data:image/jpeg;base64,' + res.data.result;
            this.dialogVisible = true;
          } else {
            this.$message.error('查看图片失败');
          }
        }, error => {
          ld.close();

          this.$message.error('查看图片异常');
          console.error(error.data.message);
        });
      },

      viewImgBase64UrlFn(id, fn) {
        const url = window.SERVE_URl + 'viewImgBase64';
        var params = _.clone(this.uploadParams);
        params.fileid = id;
        var ld = this.loading('查询图片中…');
        this.$http.post(url, params).then(res => {
          ld.close();
          if (res.data.status == 'ok') {
            fn('data:image/jpeg;base64,' + res.data.result);
            this.$message.success("图片查询成功");
          } else {
            this.$message.error('查看图片失败');
          }
        }, error => {
          ld.close();
          console.error(error.data.message);
        });
      },

      beforeRemove() {
        return false;
      },
      handleAvatarSuccess(res, file) {
        if (res.status === 'ok') {
          this.$message.success('上传成功');
          this.attachmentList.push({
            name: file.name,
            url: file.url,
            id: res.result,
            attachmentType: this.attachmentType
          });
        } else {
          this.$message.error(res.result);
        }

        this.initUploadAttachmentList();
      },

      handlePictureCardPreview(file){
        if (!this.uploadParams.preview) {
          return;
        }
        if (file.url) {
          this.dialogVisible = true;
        } else {
          var itemIndex = _.findIndex(this.uploadAttachmentList, {id: file.id});
          var _self = this;
          this.viewImgBase64UrlFn(file.id, function (url) {
            _self.$set(_self.uploadAttachmentList[itemIndex], 'url', url);
            _self.dialogVisible = true;
          });
        }
      },

      initUploadAttachmentList(){
        if (_.isEmpty(this.attachmentList)) {
          return this.uploadAttachmentList = [];
        }
        this.uploadAttachmentList = this.attachmentList.filter(item => {
          return item.attachmentType === this.attachmentType;
        });

        // 查询的数据，不存在url，查询后赋值
        /*this.uploadAttachmentList.forEach((item, index) => {
          if (!item.url) {
            var _self = this;
            this.viewImgBase64UrlFn(item.id, function (url) {
              _self.$set(_self.uploadAttachmentList[index], 'url', url);
            });
          }
        });*/
      }
    },

    watch: {
      attachmentType(val){
        if (val) {
          this.uploadParams.attachmentType = val;
        }
      },

      attachmentList(){
        this.initUploadAttachmentList();
      }
    }
  }
</script>
