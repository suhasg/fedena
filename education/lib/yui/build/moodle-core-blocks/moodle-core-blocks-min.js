YUI.add("moodle-core-blocks",function(e,t){var n="/lib/ajax/blocks.php",r={BLOCK:"block",BLOCKREGION:"block-region",BLOCKADMINBLOCK:"block_adminblock",EDITINGMOVE:"editing_move",HEADER:"header",LIGHTBOX:"lightbox",REGIONCONTENT:"region-content",SKIPBLOCK:"skip-block",SKIPBLOCKTO:"skip-block-to",MYINDEX:"page-my-index",REGIONMAIN:"region-main"},i=function(){i.superclass.constructor.apply(this,arguments)};e.extend(i,M.core.dragdrop,{skipnodetop:null,skipnodebottom:null,dragsourceregion:null,initializer:function(){this.groups=["block"],this.samenodeclass=r.BLOCK,this.parentnodeclass=r.REGIONCONTENT;var t=e.Node.all("body#"+r.MYINDEX+" #"+r.REGIONMAIN+" > ."+r.REGIONCONTENT);if(t.size()>0){var n=t.item(0);n.addClass(r.BLOCKREGION),n.set("id",r.REGIONCONTENT),n.one("div").addClass(r.REGIONCONTENT)}var i=e.Node.all("div."+r.BLOCKREGION);if(i.size()===0)return!1;if(i.size()!=this.get("regions").length){var s=e.Node.create("<div></div>").addClass(r.BLOCKREGION),o=e.Node.create("<div></div>").addClass(r.REGIONCONTENT);s.appendChild(o);var u=i.filter("#region-pre"),a=i.filter("#region-post");u.size()===0&&a.size()===1?(s.setAttrs({id:"region-pre"}),a.item(0).insert(s,"before"),i.unshift(s)):a.size()===0&&u.size()===1&&(s.setAttrs({id:"region-post"}),u.item(0).insert(s,"after"),i.push(s))}i.each(function(t){var n=new e.DD.Drop({node:t.one("div."+r.REGIONCONTENT),groups:this.groups,padding:"40 240 40 240"}),i=new e.DD.Delegate({container:t,nodes:"."+r.BLOCK,target:!0,handles:["."+r.HEADER],invalid:".block-hider-hide, .block-hider-show, .moveto",dragConfig:{groups:this.groups}});i.dd.plug(e.Plugin.DDProxy,{moveOnEnd:!1}),i.dd.plug(e.Plugin.DDWinScroll);var s=t.all("."+r.BLOCK);s.each(function(e){var t=e.one("a."+r.EDITINGMOVE);t&&(t.remove(),e.one("."+r.HEADER).setStyle("cursor","move"))},this)},this)},get_block_id:function(e){return Number(e.get("id").replace(/inst/i,""))},get_block_region:function(t){var n=t.ancestor("div."+r.BLOCKREGION).get("id").replace(/region-/i,"");return e.Array.indexOf(this.get("regions"),n)===-1?(right_to_left()&&(n==="post"?n="pre":n==="pre"&&(n="post")),"side-"+n):n},get_region_id:function(e){return e.get("id").replace(/region-/i,"")},drag_start:function(e){var t=e.target;this.dragsourceregion=t.get("node").ancestor("div."+r.BLOCKREGION),t.get("node").previous()&&t.get("node").previous().hasClass(r.SKIPBLOCK)&&(this.skipnodetop=t.get("node").previous()),t.get("node").next()&&t.get("node").next().hasClass(r.SKIPBLOCKTO)&&(this.skipnodebottom=t.get("node").next())},drop_over:function(t){var n=t.drag.get("node"),i=t.drop.get("node");i.hasClass(this.parentnodeclass)&&i.one("."+r.BLOCKADMINBLOCK)&&i.one("."+r.BLOCKADMINBLOCK).next("."+r.BLOCK)&&i.prepend(n);if(this.dragsourceregion.contains(i))return!1;var s=e.one("body"),o=this.get_region_id(this.dragsourceregion);s.hasClass("side-"+o+"-only")&&s.removeClass("side-"+o+"-only"),o=this.get_region_id(i.ancestor("div."+r.BLOCKREGION)),this.dragsourceregion.all("."+r.BLOCK).size()==0&&this.dragsourceregion.get("id").match(/(region-pre|region-post)/i)&&(s.hasClass("side-"+o+"-only")||s.addClass("side-"+o+"-only"))},drop_end:function(){this.skipnodetop=null,this.skipnodebottom=null,this.dragsourceregion=null},drag_dropmiss:function(e){this.drop_hit(e)},drop_hit:function(t){var i=t.drag,s=i.get("node"),o=t.drop.get("node");s.previous()&&s.previous().hasClass(r.SKIPBLOCK)&&s.insert(s.previous(),"after"),this.skipnodetop&&s.insert(this.skipnodetop,"before"),this.skipnodebottom&&s.insert(this.skipnodebottom,"after");var u=M.util.add_lightbox(e,s),a={sesskey:M.cfg.sesskey,courseid:this.get("courseid"),pagelayout:this.get("pagelayout"),pagetype:this.get("pagetype"),subpage:this.get("subpage"),contextid:this.get("contextid"),action:"move",bui_moveid:this.get_block_id(s),bui_newregion:this.get_block_region(o)};this.get("cmid")&&(a.cmid=this.get("cmid")),s.next("."+this.samenodeclass)&&!s.next("."+this.samenodeclass).hasClass(r.BLOCKADMINBLOCK)&&(a.bui_beforeid=this.get_block_id(s.next("."+this.samenodeclass))),e.io(M.cfg.wwwroot+n,{method:"POST",data:a,on:{start:function(){u.show()},success:function(t,n){window.setTimeout(function(){u.hide()},250);try{var r=e.JSON.parse(n.responseText);r.error&&new M.core.ajaxException(r)}catch(i){}},failure:function(e,t){this.ajax_failure(t),u.hide()}},context:this})}},{NAME:"core-blocks-dragdrop",ATTRS:{courseid:{value:null},cmid:{value:null},contextid:{value:null},pagelayout:{value:null},pagetype:{value:null},subpage:{value:null},regions:{value:null}}}),M.core_blocks=M.core_blocks||{},M.core_blocks.init_dragdrop=function(e){new i(e)}},"@VERSION@",{requires:["base","node","io","dom","dd","dd-scroll","moodle-core-dragdrop","moodle-core-notification"]});
