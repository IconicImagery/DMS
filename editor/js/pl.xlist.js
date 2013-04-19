!function ($) {

	$.xList = {

		renderList: function( panel, list ){
			var items = ''

			// console.log(list)
			// return
			$.each( list , function(index, l) {

				items += sprintf('<div class="x-item %s"><div class="x-item-frame"><img src="%s" /></div></div>', l.class, l.thumb)
			})

			output = sprintf('<div class="x-list">%s</div>', items)

			panel.find('.panel-tab-content').html( output )


		}

		, listStart: function( panel, key ){

			var that = this
			,	layout = (key == 'pl-extend') ? 'masonry' : 'fitRows';

			panel.imagesLoaded( function(){
				panel.find('.x-list').isotope({
					itemSelector : '.x-item'
					, layoutMode : layout
					, sortBy: 'number'
					, containerStyle: { position: 'relative', overflow: 'visible' }
					, getSortData : {
						number : function ( $elem ) {
							return $elem.data('number');
						}
					}
				})
			})

			//this.listPopOverStart()

			if(key == 'add-new'){
				$.plSections.init()
			}



			this.extensionActions()



		}

		, loadButtons: function( panel, data ){
			var buttons = ''

			if(panel == 'x-store'){
				buttons += $.plExtend.actionButtons( data )
			} else if ( panel == 'x-themes' ){
				buttons += $.plThemes.actionButtons( data )
			} else if ( panel == 'x-sections' ){
				buttons += sprintf('<a href="#" class="btn btn-small disabled"><i class="icon-random"></i> Drag Thumb to Page</a> ')
			}


			return buttons
		}

		, loadPaneActions: function(panel){

			if(panel == 'x-store'){
				$.plExtend.btnActions()
			} else if ( panel == 'x-themes' ){
				$.plThemes.btnActions()
			}

			$('.x-close').on('click.paneAction ', function(e){

				e.preventDefault

				var theIsotope = $(this).parent()
				,	removeItems = $('.x-remove')

				removeItems
					.off('click')

				theIsotope
					.isotope({ filter: '*' })
					.isotope('remove', removeItems)
					.removeClass('x-pane-mode')


			})
		}

		, extensionActions: function(){

			var that = this
			$('.x-extension').on('click.extensionItem', function(){
				var theExtension = $(this)
				,	theIsotope = $(this).parent()
				,	theID = $(this).data('extend-id')
				,	filterID = 'filter-'+theID
				,	filterClass = '.'+filterID
				,	ext = $.pl.config.extensions[theID] || false
				,	panel = theIsotope.data('panel') || false
				console.log('before condition')
				if(!theIsotope.hasClass('x-pane-mode') && ext){
					console.log('after condition')

					var splash	= sprintf('<div class="x-pane-frame"><img src="%s" /></div>', ext.splash)
					,	btnClose = sprintf('<div class="x-item x-close x-remove %s"><a href="#" class="btn btn-close"><i class="icon-remove"></i></a></div>', filterID)
					,	btns = sprintf('<div class="x-pane-btns">%s</div>', that.loadButtons( panel, theExtension.data() ))
					,	desc = sprintf('<div class="x-pane-info"><h4>Description</h4>%s</div>', ext.desc)
					,	extPane = $( sprintf('<div class="x-pane x-remove x-item %s" data-extend-id="%s"><div class="x-pane-pad">%s %s %s</div></div>%s', filterID, theID, splash, btns, desc, btnClose) )

					if( panel == 'x-sections' ){
						var prep = sprintf('<span class="x-remove badge badge-info %s"><i class="icon-arrow-up"></i> Drag This</span>', filterID)

						theIsotope.find('.pl-sortable').append(prep)
					}


					theIsotope
						.isotope('insert', extPane)
						.isotope({filter: filterClass})
						.addClass('x-pane-mode')
				}

				// load actions after elements added to DOM
				that.loadPaneActions( panel )


			})





		}

		, listPopOverStart: function(){
			$('.x-item').popover({
				template: '<div class="popover x-item-popover"><div class="arrow"></div><div class="popover-content"></div></div>'
				, trigger: 'hover'
				, html: true
				, container: $('.pl-toolbox')
				, placement: 'top'
			})

		}

		, listPopOverStop: function(){
			$('.x-item').popover('destroy')


		}


		, listStop: function(){

			var removeItems = $('.x-remove')

			removeItems
				.off('click')

			$('.x-extension')
				.off('click.extensionItem')

		 	$('.x-list.isotope')
				.removeClass('x-pane-mode')
				.isotope( 'remove', removeItems)
				.isotope( { filter: '*' })
				.isotope( 'destroy' )

			//this.listPopOverStop()
		}



	}

}(window.jQuery);