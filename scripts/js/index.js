(function (window, document, jQuery, undefined) {
	'use strict';

	var indexObj = new index();

	function index() {
		this._quickList     = '.quick-list';
		this._lNav          = '.l-nav';
		this._lFooter       = '.l-footer';
		this._mCut          = '.m-cut';
		this._pagination    = '.pagination';
		this._slideDown     = '.jq-slide-down';
		this._slideCut      = '.jq-slide-cut';
		this._subOwl        = '.sub-owl';
		this._sectionIndex  = 0;
		this._sectionScroll = true;
		this._once          = true;
		this._mCutHeight    = projects.$w.height();
		this._isYouTube;
	}

	index.prototype.checkCutLength = function() {
		if ($(indexObj._mCut).length > 1) {
			var _str = '';

			for (var i = 0; i < $(indexObj._mCut).length; i++) {
				_str += '<li class="list"><button class="btn-dot jq-slide-cut"></button></li>';
			}
			$(indexObj._pagination).find('.cut-dot').html(_str).find('> *').eq(0).addClass('is-curr');
			projects.$hb.animate({'scrollTop': 0}, 50);
		}
	}

	index.prototype.slideCut = function(n, direct) {
		var _quickListHeight = $(indexObj._quickList).height(),
			_lNavHeight      = $(indexObj._lNav).height(),
			_lFooterHeight   = $(indexObj._lFooter).height();

		if (n === 0) {
			// 第一 cut
			projects.$hb.animate({'scrollTop': 0}, common._animateSpeed);
		} else if (n === $(indexObj._mCut).length - 1) {
			// 最後一 cut
			if (direct !== -1) {
				// 用按的
				projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight + _quickListHeight * ($(indexObj._mCut).length - 2)}, common._animateSpeed);
			} else {
				projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight}, common._animateSpeed);
			}
		} else {
			if (direct < -1) {
				projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _quickListHeight}, common._animateSpeed);
			} else if (direct < 0 && direct >= -1) {
				projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight}, common._animateSpeed);
			} else if (direct > 1) {
				projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight}, common._animateSpeed);
			} else {
				// 往回捲
				if (n === $(indexObj._mCut).length - 2) {
					// 倒數第二 cut
					projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + (_lFooterHeight * n)}, common._animateSpeed);
				} else {
					projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + (_lFooterHeight * (n - 1))}, common._animateSpeed);
				}
			}
		}

		$(indexObj._pagination).find('.cut-dot .list').removeClass('is-curr').eq(n).addClass('is-curr');

		if (indexObj._isYouTube && n !== 0 && typeof projects._media._player.pauseVideo !== 'undefined') {
			projects._media._player.pauseVideo();
		} else if (indexObj._isYouTube && n === 0 && typeof projects._media._player.playVideo !== 'undefined' && projects.device() === 'PC') {
			projects._media._player.playVideo();
		}

		$(common._lBody).attr('data-cut', n + 1);
	}

	index.prototype.mousewheel = function() {
		projects.mousewheel(projects.$hb, function(e){
			if (!$(e.target).is('.sub-menu, .sub-menu *, .search-result-list, .search-result-list *')) {
				e.preventDefault();
				e.stopPropagation();

				if (indexObj._sectionScroll) {
					indexObj._sectionScroll = false;
					indexObj._sectionIndex = $(indexObj._pagination).find('.cut-dot .list.is-curr').index();

					if ( e.deltaY < 0 ) {
						indexObj._sectionIndex ++;
					} else {
						indexObj._sectionIndex --;
					}

					if ( indexObj._sectionIndex >= ( $(indexObj._mCut).length - 1 ) ) {
						indexObj._sectionIndex = ( $(indexObj._mCut).length - 1 );
					} else if ( indexObj._sectionIndex <= 0 ) {
						indexObj._sectionIndex = 0;
					}

					if (projects._ISMAC) {
						var _speed = 1400;
					} else {
						var _speed = common._animateSpeed;
					}

					indexObj.slideCut(indexObj._sectionIndex, e.deltaY);

					setTimeout(function(){
						indexObj._sectionScroll = true;
					}, _speed + 100);
				}
			}
		});
	}

	projects.$w.load(function(){
		if (projects._browsers.msie) {
			setTimeout(function(){
				indexObj.checkCutLength();
			}, 500);
		} else {
			indexObj.checkCutLength();
		}

		$(common._owl).each(function(){
			$(this).on('translated.owl.carousel' , function(e){
				if ($(this).find('.active .item').hasClass('is-dark')) {
					$(this).addClass('is-dark').removeClass('is-light');
				} else {
					$(this).addClass('is-light').removeClass('is-dark');
				}
			});
		});

		$('.social-wall').masonry({
			itemSelector: '.list-item',
			columnWidth: '.item-sizer',
			gutter: 20
		});

		$(indexObj._slideDown).on('click', function(){
			indexObj.slideCut(1);
		});

		$(indexObj._pagination).on('click', indexObj._slideCut, function(){
			indexObj.slideCut($(this).parent('.list').index(), $(this).parent().siblings('.is-curr').index() - $(this).parent().index());
		});

		$(indexObj._subOwl + ' .arrow').each(function(){
			$(this).css('border-bottom-color', $(this).parents('.item').css('background-color'));
		});
	});

	projects.$d.ready(function(){
		if ( projects.device() === 'PC' ) {
			indexObj.mousewheel();
		}
	});

	projects.$w.on('scroll' , function(){
		if ( projects.device() === 'PC') {
			indexObj.mousewheel();
		}
	});

	projects.$b.on('touchmove', function(e) {
		var _scrollTop;

		if (projects._ISIPHONE) {
			_scrollTop = $(common._lBody).scrollTop();
		} else {
			_scrollTop = projects.$w.scrollTop();
		}

		$(indexObj._pagination).find('.cut-dot .list').removeClass('is-curr').eq(Math.floor(_scrollTop / projects.$w.height())).addClass('is-curr');
	});

	projects.$w.resize(function(){
	});

	if ( ! window.indexObj ) {
		window.indexObj = indexObj;
	}
}(window, document, $));