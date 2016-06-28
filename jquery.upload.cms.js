/**
 *
 * cms uploader with jQuery-File-Upload
 * 用法：
 *
   1.添加依赖
     <script type="text/javascript" src="/js/jquery-easyui-1.4.2/jquery.min.js"></script>
     <script src="/js/jQuery-File-Upload/js/vendor/jquery.ui.widget.js"></script>
     <script src="/js/jQuery-File-Upload/js/jquery.iframe-transport.js"></script>
     <script src="/js/jQuery-File-Upload/js/jquery.fileupload.js"></script>
     <script src="/js/jquery-plugin/jquery.upload.cms.js"></script>
   2.增加input表单  e.g. <input  id="idName" name="表单name">

   3.对添加的表单jQuery对象调用插件方法 e.g.  $('#idName').cmsUploader();
 */
(function($){
    $.fn.cmsUploader = function(){
        //create the structure
        var uploaderId = this.attr('id');
        var uploader_span = $('<span>').attr('id',uploaderId+'_span');
        var uploader_btn = $('<input>').attr('type','button').attr('id',uploaderId+'_btn').attr('value','浏览');
        var uploader_img = $('<img>');
        var uploader_file = $('<input>').attr('type','file').css('display','none').attr('id',uploaderId+'_file');


        uploader_span.insertAfter(this);
        uploader_btn.appendTo(uploader_span);
        uploader_file.insertAfter(uploader_span);

        var existImgSrc = this.val();
        if($.trim(existImgSrc)){
            uploader_img.attr('src',existImgSrc).attr('width',160).attr('height',120).css('display','block').insertAfter(uploader_span);
        }
        //init event and jquery file upload
        //console.log(uploader_file);
        //console.log($('#'+uploaderId+"_file",_self));
        //console.log($('#'+uploaderId+"_file"));
        uploader_btn.on('click',function(evt){
            //console.log('clicked ...');
            evt.preventDefault();
            //take attention context of div element
            $('#'+uploaderId+"_file").trigger('click');
            //uploader_file.click();
        });

        uploader_file.fileupload({
            url: '/newsImgUpload/img',
            type:'POST',
            dataType: 'json',
            done: function (e, data) {
                var imgSrc = data.result.data;
                //set the input
                uploader_img.attr('src',imgSrc).attr('width',160).attr('height',120).css('display','block').insertAfter(uploader_span);
                $('#'+uploaderId).val(imgSrc);
            }
        });
        return this;
    }
}(jQuery));
