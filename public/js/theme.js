$(function() {
    "use strict";

    const baseurl = window.location.protocol + "//" + window.location.host + "/",
          loader = '<p class="display-1 m-5 p-5 text-center text-warning">'+
                        '<i class="fas fa-circle-notch fa-spin "></i>'+
                    '</p>',
          baseTitle = ' | স্মৃতির পাতা';

    
    $('.pagecontent').summernote({
        height:450,
    });

    // close topic
    $(document).on('click','.btn-close', function(){
    	$(this).parent().parent().parent().hide();
    });

    // add topic 
    $(document).on('click','.topic-add', function() {
    	const el = $('.topic-input');
    	if(el.hasClass('hide')){ 		
	    	el.removeClass('hide'),$('p',this).html('<i class="fas fa-times nav-icon text-danger"></i> বাতিল করুন');
    	}else{
	    	el.addClass('hide'),$('#topic-name').val(''),$('p',this).html('<i class="fas fa-plus nav-icon "></i> নতুন নোট যোগ করুন');
    	}
    });

    // store topic
    $(document).on('click','.topic-store', function() {
    	const el = $('.topic-store'),
    		  title = $('#topic-name').val();
    	if(title != ''){

	    	el.html('<i class="fas fa-circle-notch fa-spin"></i>');
	    	$.ajax({
	            type: "POST",
	            url : baseurl+'topic/store', 
	            data: {
	                '_token' : $('[name="_token"]').val(),
	                'title' : title,
	            }, 
	            traditional: true,
	            success: function (res) {
	            	if(res.status == true){
	            		$('.topic-list').append(res.content),$('.topic-input').addClass('hide'),$('#topic-name').val(''),
		    			$('.topic-add p').html('<i class="fas fa-plus nav-icon "></i> নতুন নোট যোগ করুন');
                        
	            	}else{
	            		el.html('<i class="fas fa-redo-alt"></i>');
	            	}
	            }
	        });
    	}
    }); 

    // edit topic
    $(document).on('click','.topic-edit', function(){
    	$(this).parent().parent().parent().next().show();
    });

    

    // update topic
    $(document).on('click','.topic-update', function() {
    	const el = $(this),
    		  id = el.data('id'),
    		  title = el.parent().prev().val(),
    		  url = 'topic/update/'+id;

    	//console.log(title);

    	if(title != ''){

	    	el.replaceWith('<i class="fas fa-circle-notch fa-spin "></i>');
	    	$.ajax({
	            type: "POST",
	            url : baseurl+url, 
	            data: {
	                '_token' : $('[name="_token"]').val(),
	                'title' : title,
	            }, 
	            traditional: true,
	            success: function (res) {
	            	if(res.status == true){
	            		$('.nav-key-'+id).replaceWith(res.content);
	            	}else{
	            		el.replaceWith('<i class="fas fa-redo-alt topic-update"></i>');
	            	}
	            }
	        });
    	}
    }); 

    // delete 
    $(document).on('click','.topic-delete', function() 
    {
        const el = $(this),
    		  id = el.data('id'),
    		  url = 'topic/delete/'+id;
        var active = false;
        if(el.parent().parent().parent().hasClass('active')){
            active = true;
        }
        swal({
            title: 'মুছে ফেলুন',
            text: 'আপনি কি মুছে ফেলতে চান?',
            icon: 'warning',
            buttons: true,
            buttons: {
                cancel: {
                    text: "না",
                    value: false,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: "হ্যাঁ",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: false
                }
            },
            dangerMode: false,
            closeOnClickOutside: false
        }).then(function(value) {
            if (value) {
                $.ajax({
                    type: "GET",
                    url : baseurl+url, 
                    traditional: true,
                    success: function (response) {
                        swal.stopLoading();
                        if(response.status == true){
                            el.parent().parent().parent().parent().remove();
                            if(active){
                                location.reload();
                            }
                            swal({
                                title: 'সফল!',
                                text: 'টপিক মুছে ফেলা হয়েছে',
                                icon: 'success',
                                timer:2000
                            });
                        }

                    }
                });  
            }
        });
    });



    // section js starts here

    // add section 
    $(document).on('click','.section-add', function() {
    	const el = $('.section-input');
    	if(el.hasClass('hide')){ 		
	    	el.removeClass('hide'),$('p',this).html('<i class="fas fa-times nav-icon text-danger"></i> বাতিল করুন');
    	}else{
	    	el.addClass('hide'),$('#section-name').val(''),$('p',this).html('<i class="fas fa-plus nav-icon "></i> নতুন সেকশন যোগ করুন');
    	}
    });

    // store section
    $(document).on('click','.section-store', function() {
    	const el = $('.section-store'),
    		  topic_id = $(this).data('topic'),
    		  title = $('#section-name').val();
    	if(title != '' && topic_id != ''){

	    	el.html('<i class="fas fa-circle-notch fa-spin"></i>');
	    	$.ajax({
	            type: "POST",
	            url : baseurl+'section/store', 
	            data: {
	                '_token' : $('[name="_token"]').val(),
	                'title' : title,
	                'topic_id' : topic_id
	            }, 
	            traditional: true,
	            success: function (res) {
	            	if(res.status == true){
	            		$('.section-nav').append(res.content),$('.section-input').addClass('hide'),$('#section-name').val(''),
		    			$('.section-add p').html('<i class="fas fa-plus nav-icon "></i> নতুন সেকশন যোগ করুন');
	            	}else{
	            		el.html('<i class="fas fa-redo-alt"></i>');
	            	}
	            }
	        });
    	}
    }); 

    // edit section
    $(document).on('click','.section-edit', function(){
    	$(this).parent().parent().parent().next().show();
    });

    

    // update section
    $(document).on('click','.section-update', function() {
    	const el = $(this),
    		  id = el.data('id'),
    		  title = el.parent().prev().val(),
    		  url = 'section/update/'+id;

    	//console.log(title);

    	if(title != ''){

	    	el.replaceWith('<i class="fas fa-circle-notch fa-spin "></i>');
	    	$.ajax({
	            type: "POST",
	            url : baseurl+url, 
	            data: {
	                '_token' : $('[name="_token"]').val(),
	                'title' : title,
	            }, 
	            traditional: true,
	            success: function (res) {
	            	if(res.status == true){
	            		$('.section-key-'+id).replaceWith(res.content);
	            	}else{
	            		el.replaceWith('<i class="fas fa-redo-alt section-update"></i>');
	            	}
	            }
	        });
    	}
    }); 

    // delete 
    $(document).on('click','.section-delete', function() 
    {
        const el = $(this),
    		  id = el.data('id'),
    		  url = 'section/delete/'+id;
        var active = false;
        if(el.parent().parent().parent().hasClass('active')){
            active = true;
        }
        swal({
            title: 'মুছে ফেলুন',
            text: 'আপনি কি মুছে ফেলতে চান?',
            icon: 'warning',
            buttons: true,
            buttons: {
                cancel: {
                    text: "না",
                    value: false,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: "হ্যাঁ",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: false
                }
            },
            dangerMode: false,
            closeOnClickOutside: false
        }).then(function(value) {
            if (value) {
                $.ajax({
                    type: "GET",
                    url : baseurl+url, 
                    traditional: true,
                    success: function (response) {
                        swal.stopLoading();
                        if(response.status == true){
                            el.parent().parent().parent().parent().remove();
                            if($('.section-nav li').length === 0){
                                $('.page-add').addClass('disabledarea').attr('data-section', );
                            }
                            if(active){
                                location.reload();
                            }
                            swal({
                                title: 'সফল!',
                                text: 'সেকশনটি মুছে ফেলা হয়েছে',
                                icon: 'success',
                                timer:2000
                            });
                        }

                    }
                });  
            }
        });
    });

    $(document).on('click', '.page-add', function(){
    	const section_id = $(this).data('section');
    	// loader
    	$('.page-content').html(loader);
    	$.ajax({
            type: "GET",
            url : baseurl+'page/create', 
            data: {section_id:section_id}, 
            traditional: true,
            success: function (res) {
            	if(res.status == true){
            		$('.page-content').html(res.content);
            		$('.page-anchor').removeClass('active')
            		$('.pagecontent').summernote({
				        height:250,
				    });
            	}else{
            	}
            }
        });

    });

    $(document).on('click', '.page-save', function(){
    	const el = $(this);
        if(el.find('i').length === 0){
            el.append(' &nbsp;<i class="fas fa-circle-notch fa-spin" style="font-size:12px;"></i>');
        }else{
        	el.find('i').replaceWith('<i class="fas fa-circle-notch fa-spin" style="font-size:12px;"></i>');
        }
    	// loader
    	//$('.page-content').html(loader);
    	$.ajax({
            type: "POST",
            url : baseurl+'page/store', 
            data: {
            	_token : $('[name="_token"]').val(),
                title : $('.page-title').val(),
                content : $('.pagecontent').val(),
            	section_id: $('.page-section-id').val()
            }, 
            traditional: true,
            success: function (res) {
            	if(res.status == true){
            		$('.page-anchor').parent().parent().removeClass('active')
            		$('.page-nav').append(res.menu_item);
            		$('.page-content').html(res.content);
				    
                    var url = baseurl+'content?topic='+res.section.topic_id+'&section='+res.page.section_id+'&page='+res.page.id;
                    var title = res.page.title;
                   
                    window.history.pushState('','',url);
                    document.title = title+baseTitle;
            	}else{

            		el.find('i').replaceWith('<i class="fas fa-redo-alt" style="font-size:12px;"></i>');
            	}
            }
        });

    });

    $(document).on('click','.page-delete', function() 
    {
        const el = $(this),
              id = el.data('id'),
              url = 'page/delete/'+id;
        var active = false;
        if(el.parent().parent().parent().hasClass('active')){
            active = true;
        }

        swal({
            title: 'মুছে ফেলুন',
            text: 'আপনি কি মুছে ফেলতে চান?',
            icon: 'warning',
            buttons: true,
            buttons: {
                cancel: {
                    text: "না",
                    value: false,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: "হ্যাঁ",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: false
                }
            },
            dangerMode: false,
            closeOnClickOutside: false
        }).then(function(confirmed) {
            if (confirmed) {
                $.ajax({
                    type: "GET",
                    url : baseurl+url, 
                    traditional: true,
                    success: function (response) {
                        swal.stopLoading();
                        if(response.status == true){
                            el.parent().parent().parent().parent().remove();
                            if(active){
                                location.reload();
                            }
                            swal({
                                title: 'সফল!',
                                text: 'পৃষ্ঠাটি মুছে ফেলা হয়েছে',
                                icon: 'success',
                                timer:2000
                            });
                        }

                    }
                });  
            }
        });
    });

    $(document).on('click','.page-edit', function(){
        const id = $(this).data('id'),
              el = $(this);
        // loader
        $('.page-content').html(loader);
        $.ajax({
            type: "GET",
            url : baseurl+'page/edit/'+id, 
            traditional: true,
            success: function (res) {
                if(res.status == true){
                    $('.page-content').html(res.content);
                    $('.pagecontent').summernote({
                        height:250,
                    });
                    
                }else{
                }
            }
        });
    });

    $(document).on('click', '.page-update', function(){
        const el = $(this), id = $(this).data('id');
        if(el.find('i').length === 0){
            el.append(' &nbsp;<i class="fas fa-circle-notch fa-spin" style="font-size:12px;"></i>');
        }else{
            el.find('i').replaceWith('<i class="fas fa-circle-notch fa-spin" style="font-size:12px;"></i>');
        }
        // loader
        //$('.page-content').html(loader);
        $.ajax({
            type: "POST",
            url : baseurl+'page/update/'+id, 
            data: {
                _token : $('[name="_token"]').val(),
                title : $('.page-title').val(),
                content : $('.pagecontent').val()
            }, 
            traditional: true,
            success: function (res) {
                if(res.status == true){
                    $('.page-content').html(res.content);
                }else{

                    el.find('i').replaceWith('<i class="fas fa-redo-alt" style="font-size:12px;"></i>');
                }
            }
        });

    });

    // load dynamic content: page
    $(document).on('click','.page-anchor', function(){
    	const id = $(this).data('id'),
    		  el = $(this);
    	// loader
    	$('.page-content').html(loader);
    	$.ajax({
            type: "GET",
            url : baseurl+'page/show/'+id, 
            traditional: true,
            success: function (res) {
            	if(res.status == true){
            		$('.page-content').html(res.content),$('.page-anchor').parent().parent().removeClass('active'),
            		el.parent().parent().addClass('active');
                    var url = baseurl+'content?topic='+res.section.topic_id+'&section='+res.page.section_id+'&page='+res.page.id;
                    var title = res.page.title;
                   
                    window.history.pushState('','',url);
                    document.title = title+baseTitle;
            		
            	}else{
            	}
            }
        });
    });

    $(document).on('click','.section-anchor', function(){
        const id = $(this).data('id'),
              el = $(this);
        // loader
        $('.page-content').html(loader);
        $.ajax({
            type: "GET",
            url : baseurl+'section/show/'+id, 
            traditional: true,
            success: function (res) {
                if(res.status == true){
                    $('.page-menu').html(res.menu),$('.page-content').html(res.content),
                    $('.section-anchor').parent().parent().removeClass('active'), 
                    el.parent().parent().addClass('active');
                    var url = baseurl+'content?topic='+res.section.topic_id+'&section='+res.section.id;
                    var title = res.section.title;
                    if(res.section.page[0]){
                        url = url+'&page='+res.section.page[0].id;
                        var title = res.section.page[0].title;
                    }
                    window.history.pushState('','',url);
                    document.title = title+baseTitle;
                    
                }
            }
        });
    });


});

