(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();
	var _en;

	function page() {
		this._lBody        = '.l-body';
		this._lHeader      = '.l-header';
		this._lContent     = '.l-content';
		this._owl          = '.jQ-owl';
		this._countHeight  = '.jQ-count-height';
		this._btnTop       = '.jQ-top';
		this._select       = '.jQ-select';
		this._menu         = '.jQ-menu';
		this._subMenu      = '.jQ-sub-menu';
		this._sideMenu     = '.jQ-side-menu';
		this._video        = '.jQ-video';
		this._mute         = '.jQ-mute';
		this._tab          = '.jQ-tab';
		this._btnAccordion = '.jQ-btn-accordion';
		this._checkbox     = '.jQ-checkbox';
		this._radio        = '.jQ-radio';
		this._calc         = '.jQ-calc';
		this._tagSelect    = '.jQ-tag-select';
		this._share        = '.jQ-share';
		this._browserAdj   = '.jQ-browserAdj';
		this._adjHeight    = '.jQ-adjHeight';
		this._clearInput   = '.jQ-clear-input';
		this._openBox      = '.jQ-open-box';
		this._closeBox     = '.jQ-close-box';
		this._btnFunc      = '.jQ-btn-func';
		this._btnMarquee   = '.jQ-btn-marquee';
		this._langSwitch   = '.jQ-lang-switch';
		this._closePopup   = '.jQ-close-popup';
		this._sendMsg      = '.jQ-send-msg';
		this._btnSearch    = '.jQ-btn-search';
		this._btnOpen      = '.jQ-open-calendar';
		this._btnClose     = '.jQ-close-calendar';
		this._btnLike      = '.jQ-like';
		this._btnFinish    = '.jQ-finish';
		this._btnNext      = '.jQ-next';
		this._addingWrap   = '.m-adding-wrap';
		this._shortcutWrap = '.shortcut-wrap';
		this._teachOwl     = '.teach-owl';
		this._leavePage    = false;
		this._animateSpeed = 400;
		this._masonryLoad  = false;
	}

	// header 仿下拉選單
	page.prototype.selectUI = function() {
		$(common._select).each(function(){
			var $this = $(this),
				_val  = '';

			if ($this.find('.is-selected').length !== 0) {
				if ($this.data('structure') === 'html') {
					_val = $this.find('.is-selected').html();
				} else {
					_val = $this.find('.is-selected').text();
				}
			} else {
				if ($this.data('structure') === 'html') {
					_val = $this.find('.list').eq(0).html();
				} else {
					_val = $this.find('.list').eq(0).text();
				}
			}

			$this.find('.m-selected-item').html(_val);

			$this.on('click', function(){
				$this.toggleClass('is-active');

				common.offClick(common._select);
			});

			$this.find('.list').on('click', function(){
				$(this).addClass('is-selected').siblings().removeClass('is-selected');

				if ($this.data('structure') === 'html') {
					$this.find('.m-selected-item').html($(this).html());
				} else {
					$this.find('.m-selected-item').html($(this).text());
				}
			});
		});
	}

	// 首次使用教學
	page.prototype.teachLesson = function() {
		if (localStorage.getItem('teach-lesson') !== 'true') {
			$(common._lBody).addClass('show-teach');
		}
	}

	// 點擊目標區域以外的地方可關閉目標區域
	page.prototype.offClick = function(_target) {
		projects.$d.off('click').on('click' , function(e){
			e.stopPropagation();

			if (_target === '.m-lightbox-content') {
				// 關閉 lightbox
				e.stopPropagation();

				if (!$(e.target).is(common._openBox + ', ' + common._openBox + ' *,' + _target + ', ' + _target + ' *') && $(e.target).data('callback') !== true && $(common._lBody).hasClass('show-lightbox')) {
					common.closeBoxEvent();
				}
			} else if (_target === '.jQ-category') {
				if (!$(e.target).is(_target + ', ' + _target + ' *')) {
					$(_target).removeClass('is-active');
				}
			} else if (_target === '.popup-function') {
				if (!$(e.target).is(_target + ', ' + _target + ' *, ' + common._btnFunc + ', ' + common._btnFunc + ' *')) {
					$(_target).prev().removeClass('show-func');
				}
			} else if (_target === common._select) {
				if (!$(e.target).is(_target + ', ' + _target + ' *')) {
					$(_target).removeClass('is-active');
				}
			} else if (_target === '.calendar-box') {
				if (!$(e.target).is(_target + ', ' + _target + ' *, ' + common._addingWrap + ', ' + common._addingWrap + ' *')) {
					$(common._addingWrap).removeClass('is-open');
				}
			}
		});
	}

	// 捲到頁尾時觸發的事件
	page.prototype.showFooter = function() {
		var _totalH  = (projects._browsers.msie && projects._browsers.version === 9) ? projects.$b.height() : projects.$hb.height(),
			_cutH    = projects.$w.height(),
			_scrollH = projects.$w.scrollTop();

		if (_totalH <= _cutH + Math.ceil(_scrollH)) {
			$(common._lBody).addClass('show-footer');

			if ($(common._lBody).hasClass('branch') && !common._masonryLoad && localStorage.getItem('teach-lesson') === 'true') {
				var $item = $(pageObj._masonryArray.join(''));

				$('.social-wall').append($item).masonry('appended', $item);
				common._masonryLoad = true;
			}
		} else if (_scrollH <= 70) {
			$(common._lBody).addClass('show-header');
		} else {
			$(common._lBody).removeClass('show-header show-footer');
		}
	}

	// 計算 header menu 高度
	page.prototype.headerHeight = function() {
		$(common._countHeight).each(function(){
			var $list   = $(this).find('.list'),
				_column = $(this).data('column'),
				_middle = Math.ceil($list.length / _column);

			for (var i = 0; i <= _middle; i++) {
				$(this).find('> .list:lt(' + _middle + ')').wrapAll('<div class="list-block"></div>');
			}
		});
	}

	// 捲動暫停影片
	page.prototype.pauseVideo = function() {
		$(common._video).each(function(){
			if ($(this).offset().top + $(this).height() < projects.$w.scrollTop() + parseInt($(common._lContent).css('padding-top'), 10) || common._leavePage === true) {
				for (var i = 0; i < projects._media._player.length; i++) {
					if ( ! projects._media._player[i].getPlayerState ) return false;
					if (projects._media._player[i].getPlayerState() === 1) {
						projects._media._player[i].pauseVideo();
					}

					$('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=1/ , 'autoplay=0'));
				}
			// } else if ($(this).parents('.owl-item').hasClass('active')) {
			// 	for (var i = 0; i < projects._media._player.length; i++) {
			// 		if ( ! projects._media._player[i].getPlayerState ) return false;
			// 		if (projects._media._player[i].getPlayerState() === 2) {
			// 			projects._media._player[i].playVideo();
			// 			$('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=0/ , 'autoplay=1'));
			// 		}
			// 	}
			}
		});
	}

	// 重回視窗繼續影片
	page.prototype.returnPage = function() {
		$(common._video).each(function(){
			if ($(this).parents('.owl-item').hasClass('active') && $(this).offset().top + $(this).height() > projects.$w.scrollTop() + parseInt($(common._lContent).css('padding-top'), 10)) {
				for (var i = 0; i < projects._media._player.length; i++) {
					if ( ! projects._media._player[i].getPlayerState ) return false;
					if (projects._media._player[i].getPlayerState() === 2 && !$(this).hasClass('is-pause')) {
						projects._media._player[i].playVideo();
						$('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=0/ , 'autoplay=1'));
					}
				}
			}
		});
	}

	page.prototype.touchLock = function(_scrollTop) {
		$(common._owl).on('touchmove touchend', function(e){
			projects.$w.scrollTop(_scrollTop);
		});
	}

	page.prototype.selectInputCheck = function() {
		if($('input[type="radio"]:checked').length !== 0) {
			$(common._radio).each(function(){
				if($(this).find('input[type="radio"]:checked').length !== 0) {
					var _name = $(this).find('input[type="radio"]:checked').attr('name');

					$('input[type="radio"][name="' + _name + '"]').parents(common._radio).removeClass('is-checked');
					$(this).addClass('is-checked');
				}
			});
		}
	}

	// pc tab 到 M 版變成 <select>
	page.prototype.changeToSelect = function() {
		$(common._tagSelect).each(function(){
			var $this = $(this),
				_str  = '<select class="m-selection">',
				_icon = [],
				_idx  = $this.find('.is-curr').length !== 0 ? $this.find('.is-curr').parent().index() : 0;

			if ($this.find('button').length !== 0) {
				for (var i = 0; i < $this.find('> *').length; i++) {
					_str += '<option value="" class="jQ-tab">' + $this.find('> *').eq(i).text() + '</option>';
				}
			} else if ($this.find('a').length !== 0) {
				for (var i = 0; i < $this.find('a.b-link').length; i++) {
					_str += '<option value="' + $this.find('a.b-link').eq(i).attr('href') + '">' + $this.find('a.b-link').eq(i).text() + '</option>';
				}
			}

			_str += '</select>';

			// 特例：美食首頁
			if ($this.data('case') === 'food') {
				for (var i = 0; i < $this.find('> *').length; i++) {
					_icon.push($this.find('> *').eq(i).find('.icon-wrap')[0].outerHTML);
				}

				_str += '<div class="m-selected-item b-hide-dt b-text-center"></div>';

				$this.html(_str + _icon[_idx]).find('option').eq(_idx).attr('selected', 'selected');
				$this.find('.m-selected-item').text($this.find('option').eq(_idx).text());
			} else {
				$this.html(_str).find('option').eq(_idx).attr('selected', 'selected');
			}

			$this.on('change', '.m-selection', function(){
				var _idx = $(this).find('option:selected').index();

				if ($this.data('case') === 'food') {
					$(this).siblings('.icon-wrap').remove();
					$(this).siblings('.m-selected-item').text($(this).find('option:selected').text());
					$(this).parent().append(_icon[_idx]);
				}

				$(this).parents('.m-tab-wrap').siblings('.m-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');
			});
		});
	}

	// FB 分享另開小視窗
	page.prototype.openWin = function(element) {
		var _top      = element.data('height') ? ( ( window.screen.availHeight - element.data('height') ) / 2 ) : ( ( window.screen.availHeight - 600 ) / 2 ),
			_left     = element.data('width') ? ( ( window.screen.availLeft || window.screenX ) + ( projects.$d.width() / 2 ) ) - ( element.data('width') / 2 ) : ( ( window.screen.availLeft || window.screenX ) + ( projects.$d.width() / 2 ) ) - ( 600 / 2 ),
			_width    = element.data('width') || 600,
			_height   = element.data('height')  || 600,
			_menubar  = element.data('menu-bar')  || 'no',
			_titlebar = element.data('title-bar') || 'no',
			_status   = element.data('status') || 'no';

		window.open('' + element.attr('href') + '' , '' , 'top=' + _top + ', left=' + _left + ', width=' + _width + ', height=' + _height + ', menubar=' + _menubar + ', titlebar=' + _titlebar + ', status=' + _status + '' , false);
	}

	page.prototype.totalHeight = function() {
		$(common._browserAdj).each(function(){
			var $adjHeight = $(this).find(common._adjHeight);
			
			$adjHeight.attr('style', '');

			if (navigator.userAgent.indexOf('MSIE 9') > 0) {
				var _maxHeight = 0;

				$adjHeight.each(function(){
					if (_maxHeight < $(this).height()) {
						_maxHeight = $(this).height();
					}
				});
				
				$adjHeight.each(function(){
					$(this).height(_maxHeight);
				});
			} else {
				$adjHeight.each(function(){
					$(this).height($(this).parent().height());
				});
			}
		});
	}

	page.prototype.tabSwitch = function(_anchor, _accordion) {
		$(common._tab).each(function(){
			if ($(this).hasClass(_anchor)) {
				var _main = $(this).data('main'),
					_sub  = $(this).data('sub');

				if (_main !== undefined) {
					$('.l-main .main-tab > .m-tab-wrap > .tab-list').eq(_main).find(common._tab).trigger('click');
				}

				if (_sub !== undefined) {
					$(this).parents('.sub-tab').find('> .m-tab-wrap > .tab-list').eq(_sub).find(common._tab).trigger('click');
				}

				$(this).trigger('click');

				if (_accordion !== undefined) {
					$(common._btnAccordion + '[data-hushtag="' + _accordion + '"]').trigger('click');
				}
			}
		});

		projects.$w.animate({
			'scrollTop' : $(common._lContent + ' .main-tab').offset().top - $(common._lHeader).height()
		}, common._animateSpeed);
	}

	page.prototype.openBoxEvent = function() {
		$(common._lBody).addClass('show-lightbox');
		common.offClick('.m-lightbox-content');
	}

	page.prototype.closeBoxEvent = function() {
		if (navigator.userAgent.indexOf('MSIE 9') > 0) {
			$(common._lBody).removeClass('show-lightbox');
		} else {
			$(common._lBody).addClass('fade-out').on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
				$(common._lBody).removeClass('show-lightbox fade-out').off('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend');
			});
		}

		if ($('.m-lightbox-content form').length !== 0) {
			$('.m-lightbox-content form').validate().resetForm();
		}
	}

	page.prototype.sendServiceMsg = function() {
		var $chatWrap = $('.chat-wrap');

		$chatWrap.append('<div class="msg-wrap user b-clearfix"><figure class="head-img-wrap img-wrap b-float-right"><img src="../../content/img/shared/heads/user.png" alt=""></figure><p class="msg-wording b-inline b-float-right b-text-left">' + $(common._sendMsg + ' .m-inputbox').val() + '</p></div>');
		$(common._sendMsg + ' .m-inputbox').val('');
		$('.function-bd').scrollTop($chatWrap[0].scrollHeight);
	}

	page.prototype.mobileHeaderReset = function() {
		var _str = $(common._shortcutWrap)[0].outerHTML;

		$(common._shortcutWrap).remove();
		$('.header-wrap').append(_str);
	}

	page.prototype.btnFavorite = function(elem, decide) {
		if (decide === true) {
			$(elem).addClass('is-add show-text').find('.text').text('已加入收藏');
		} else {
			$(elem).removeClass('is-add').addClass('show-text').find('.text').text('已取消收藏');
		}

		$(elem).find('.text').delay(1500).queue(function(){
			$(this).dequeue();
			$(elem).removeClass('show-text');
		});
	}

	page.prototype.btnGoogleCalendsr = function(elem) {
		$(elem).parent('.calendar-box').prev('.btn-calendar').addClass('is-add');
		alert('已加入行事曆');
		$(elem).parent().parent(common._addingWrap).removeClass('is-open');
	}

	projects.$w.load(function(){
		common.headerHeight();
		common.showFooter();
		projects.owlCarousel(common._owl);

		// 網址有 # 可定位頁籤
		if (projects._HREF.split('?')[1] !== undefined && $('.main-tab').length !== 0) {
			common.tabSwitch(projects._HREF.split('?')[1].split('&')[0], projects._HREF.split('&')[1]);
		}
	});

	projects.$d.ready(function(){
		common.selectInputCheck();
		common.teachLesson();

		if (sessionStorage.getItem('marquee') === 'readed') {
			$(common._lBody).removeClass('show-marquee');
		}

		if (projects.device() === 'Mobile') {
			if ($(common._shortcutWrap).length !== 0) {
				common.mobileHeaderReset();
			}
			
			$(common._owl).on('drag.owl.carousel', function(){
				common.touchLock(projects.$w.scrollTop());
			});

			$(common._owl).on('translated.owl.carousel', function(){
				$(common._owl).off('touchmove touchend');
			});

			$(common._sideMenu).removeClass('is-active');
			
			if ($(common._tagSelect).length !== 0) {
				common.changeToSelect();
			}

			if ($(common._lBody).hasClass('show-marquee')) {
				$(common._lContent).css('padding-top', $('.marquee-wrap').outerHeight() + parseInt($(common._lContent).css('padding-top'), 10));
			}
		}

		// 不支援 flex 撐高滿版補充事件
		if (((projects._browsers.safari === true && projects._browsers.chrome === false) || navigator.userAgent.indexOf('MSIE 9') > 0) && projects.device() !== 'Mobile') {
			common.totalHeight();
		}

		// 有影片才觸發偵聽事件
		if ($(common._video).length !== 0) {
			window.onblur = window.onfocusout = window.onpagehide = function(){
				common._leavePage = true;
				common.pauseVideo();
			}

			window.onfocus = window.onfocusin = window.onpageshow = function(){
				common._leavePage = false;
				common.returnPage();
			}
		}

		common.selectUI();

		// 結束首次教學
		$(common._btnFinish).on('click', function(){
			localStorage.setItem('teach-lesson', true);

			$(common._lBody).addClass('fade-out').on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
				$(common._lBody).removeClass('show-teach fade-out').off('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend');
			});
		});

		// 教學下一步
		$(common._btnNext).on('click', function(){
			if (projects.device() !== 'Mobile') {
				$('.m-teach').attr('data-step', $(this).data('next'));
			} else {
				projects.owlNext(common._teachOwl);
			}
		});

		projects.owlEvents(common._teachOwl, 'changed.owl.carousel' , function(event){
			var _index = event.item.index;

			if (_index === event.item.count - 1) {
				$(common._teachOwl).next('.btn-wrap').addClass('end-owl');
			} else {
				$(common._teachOwl).next('.btn-wrap').removeClass('end-owl');
			}
		});

		$(common._btnTop).on('click', function(){
			projects.$hb.animate({'scrollTop': 0}, common._animateSpeed);

			if ($(common._lBody).hasClass('index')) {
				$(common._lBody).attr('data-cut', 1);
				$('.pagination').find('.cut-dot .list').removeClass('is-curr').eq(0).addClass('is-curr');
			}
		});

		$(common._menu).on('click', function(){
			$(common._lHeader + ' .header-wrap').toggleClass('is-active');
		});

		$(common._langSwitch).on('click', function(){
			if (projects.device() === 'Mobile') {
				$(this).parent().toggleClass('is-active');
			}
		});

		$(common._sideMenu).on('click', function(){
			if (projects.device() === 'Mobile' && $('.function-list').hasClass('hide-menu')) {
				$('.function-list').removeClass('hide-menu');
				$('.show-func').removeClass('show-func');
			} else {
				$(this).toggleClass('is-active');

				if ($(this).hasClass('is-active')) {
					$('.collapse-wrap').on('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$(this).off('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend');
						$(common._lBody).addClass('is-padding-arrow');
					});
				} else {
					$(common._lBody).removeClass('is-padding-arrow');
				}
			}
		});

		$(common._subMenu).on('click', function(){
			if (projects.device() === 'Mobile') {
				$(this).toggleClass('is-curr');
			}
		});

		$(common._video).on('click', function(){
			if ($(this).parents('.owl-item').hasClass('active')) {
				var _idx = $(this).find('.m-youtube-append').attr('id').split('m-youtube-')[1];

				if (projects._media._player[_idx].getPlayerState() !== 1) {
					$(this).removeClass('is-pause');
					$(this).parent().attr('data-media' , $(this).parent().attr('data-media').replace(/autoplay=0/ , 'autoplay=1'));
					projects._media._player[_idx].playVideo();
				} else {
					$(this).addClass('is-pause');
					$(this).parent().attr('data-media' , $(this).parent().attr('data-media').replace(/autoplay=1/ , 'autoplay=0'));
					projects._media._player[_idx].pauseVideo();
				}
			}
		});

		$(common._mute).on('click', function(){
			var _idx = $(this).prevAll(common._video).find('.m-youtube-append').attr('id').split('m-youtube-')[1];

			if ($(this).hasClass('is-mute')) {
				$(this).removeClass('is-mute');
				projects._media._player[_idx].unMute();
			} else {
				$(this).addClass('is-mute');
				projects._media._player[_idx].mute();
			}
		});

		$(common._tab).on('click', function(){
			var _idx = $(this).parent().index();

			$(this).addClass('is-curr').parent().siblings().find(common._tab).removeClass('is-curr');
			$(this).parents('.m-tab-wrap').siblings('.m-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');

			if ($(this).attr('data-hushtag') !== undefined && history.pushState !== undefined) {
				history.pushState('' , document.title , projects._HREF.split('?')[0] + '?' + $(this).attr('data-hushtag'));
			}

			if ($(common._browserAdj).length !== 0) {
				common.totalHeight();
			}

			if ($(common._lBody).hasClass('foods-index') && $(this).data('kv-switch') === true) {
				$('.kv-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');
			}
		});

		$(common._btnAccordion).on('click', function(){
			$(this).parents('.m-accordion').toggleClass('is-open');

			if ( projects.device() === 'PC') {
				$(this).parents('.m-accordion').siblings().removeClass('is-open');
			}

			if ($(this).attr('data-hushtag') !== undefined) {
				history.pushState('' , document.title , projects._HREF.split('&')[0] + '&' + $(this).attr('data-hushtag'));
			}
		});

		$(common._lBody).on('click', common._checkbox, function(){
			if ($(this).data('select-all') === true) {
				var _name = $(this).data('gruop-name');

				if($(this).find('input[type="checkbox"]:checked').length === 0) {
					$(this).addClass('is-checked').find('input[type="checkbox"]').prop('checked', true);
					$('[data-select-name="' + _name + '"]').addClass('is-checked').find('input[type="checkbox"]').prop('checked', true);
				} else {
					$(this).removeClass('is-checked').find('input[type="checkbox"]').prop('checked', false);
					$('[data-select-name="' + _name + '"]').removeClass('is-checked').find('input[type="checkbox"]').prop('checked', false);
				}
			} else {
				if($(this).find('input[type="checkbox"]:checked').length === 0) {
					$(this).addClass('is-checked').find('input[type="checkbox"]').prop('checked', true);
				} else {
					$(this).removeClass('is-checked').find('input[type="checkbox"]').prop('checked', false);
				}
			}
		});

		$(common._lBody).on('click', common._radio, function(){
			if($(this).find('input[type="radio"]:checked').length !== 0) {
				var _name = $(this).find('input[type="radio"]:checked').attr('name');

				$('input[type="radio"][name="' + _name + '"]').parents(common._radio).removeClass('is-checked');
				$('input[type="radio"][name="' + _name + '"]').parent().removeClass('error');
				$(this).addClass('is-checked');
			}

			if($(this).parent().hasClass('deliver-method')) {
				if($(this).data('deliver') === 'store') {
					$(this).parent().addClass('is-store').find('.m-selection').prop('disabled', '');
				} else {
					$(this).parent().removeClass('is-store').find('.m-selection').prop('disabled', 'disabled');
				}
			}

			if($(this).parents('.m-tab-wrap').hasClass('invoice-selection')) {
				$(this).parents('.m-tab-wrap').next('.m-tab-content').find('.content-list').find('input, select').prop('disabled', 'disabled');
				$(this).parents('.m-tab-wrap').next('.m-tab-content').find('.content-list').eq($(this).parent().index()).find('input, select').prop('disabled', '');
			}
		});

		$(common._lBody).on('click', common._calc, function(){
			var _val = parseInt($(this).siblings('.m-box-holder').find('.m-inputbox').val(), 10);

			if ($(this).data('calc') === 'minus') {
				_val <= 2 ? $(this).siblings('.m-box-holder').find('.m-inputbox').val(1) : $(this).siblings('.m-box-holder').find('.m-inputbox').val(_val - 1);
			} else {
				$(this).siblings('.m-box-holder').find('.m-inputbox').val(_val + 1);
			}
		});

		$(common._clearInput).on('click', function(){
			$('.jQ-clear-area .m-inputbox').val('');
		});

		$(common._share).on('click' , function(e){
			e.preventDefault();
			common.openWin($(this));
		});

		$(common._openBox).on('click' , function(){
			common.openBoxEvent();
		});

		$(common._closeBox).on('click' , function(){
			common.closeBoxEvent();
		});

		$(common._btnFunc).on('click' , function(){
			if ($(this).hasClass('show-func')) {
				$(this).removeClass('show-func');
			} else {
				$('.show-func').removeClass('show-func');
				$(this).addClass('show-func');
			}

			if ($(this).data('sidebar-close') === true) {
				$(common._sideMenu).removeClass('is-active');
			}

			if ($(this).data('place') !== 'aside') {
				$(common._lBody).removeClass('is-padding-arrow');
			}

			if($(common._addingWrap).hasClass('is-open')) {
				$(common._addingWrap).removeClass('is-open');
			}

			if (projects.device() === 'Mobile') {
				if ($(this).data('place') === 'aside') {
					$(this).parents('.function-list').addClass('hide-menu');
				} else {
					$('.quick-list .is-active').removeClass('is-active');
				}
			}

			common.offClick('.popup-function');
		});

		$(common._closePopup).on('click' , function(){
			$(this).parents('.popup-function').prev().removeClass('show-func');
			
			if (projects.device() === 'Mobile') {
				$('.function-list').removeClass('hide-menu')
			}
		});

		$(common._btnMarquee).on('click' , function(){
			$(common._lBody).removeClass('show-marquee');
			sessionStorage.setItem('marquee', 'readed');

			if (projects.device() === 'Mobile') {
				$(common._lContent).css('padding-top', '');
			}
		});

		$(common._btnSearch).on('click' , function(){
			if ($(this).prev('input').val() !== '') {
				window.location.href = $(this).data('url') + '?keyword=' + $(this).prev('input').val();
			}
		});

		$(common._lBody).on('click', common._btnOpen, function(){
			if ($(this).parent(common._addingWrap).hasClass('is-open')) {
				$(this).parent(common._addingWrap).removeClass('is-open');
			} else {
				$(common._addingWrap).removeClass('is-open');
				$(this).parent(common._addingWrap).addClass('is-open');
				common.offClick('.calendar-box');

				if (projects.$w.scrollTop() > $(this).next('.calendar-box').offset().top - $(common._lHeader).height()) {
					projects.$hb.animate({
						'scrollTop' : $(this).next('.calendar-box').offset().top - $(common._lHeader).height()
					}, common._animateSpeed);
				}
			}

			$('.show-func').removeClass('show-func');
		});

		$(common._lBody).on('click', common._btnClose, function(){
			$(this).parent().parent(common._addingWrap).removeClass('is-open');
		});

		// $(common._sendMsg + ' .btn-send').on('click' , function(){
		// 	common.sendServiceMsg();
		// });

		$(common._tagSelect).on('change', 'select', function(){
			if($(this).val() !== '' && $(this).val() !== 'javascript:;' && $(this).val() !== '#') {
				window.location.href = $(this).val();
			}
		});

		projects.$d.keydown(function(e){
			if (e.keyCode === 27 && $(common._lBody).hasClass('show-lightbox')) {
				common.closeBoxEvent();
			}
			// if (e.keyCode === 13 && $('.customer-service').prev().hasClass('show-func')) {
			// 	common.sendServiceMsg();
			// }
		});
	});

	projects.$w.on('scroll' , function(){
		common.showFooter();
		common.pauseVideo();
	});

	projects.$w.resize(function(){
		if (projects.device() !== 'Mobile') {
			common.showFooter();
		} else {
			if ($(common._tagSelect).length !== 0 && $(common._tagSelect).children().prop('tagName').toLowerCase() !== 'select') {
				common.changeToSelect();
			}
		}
	});

	if ( ! window.common ) {
		window.common = common;
	}
}(window, document, $));