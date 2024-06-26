/** @odoo-module **/
import publicWidget from "@web/legacy/js/public/public_widget";

export const RenderButton = publicWidget.Widget.extend({
    selector: '.click_render_data',
        events: {
            'click': '_onClickButton'
        },
        init: function() {
            this._super.apply(this, arguments);
            this.rpc = this.bindService("rpc");
        },
        start: function() {
            var def = this._super.apply(this, arguments);
            return def;
        },
        _onClickButton: async function(ev){
            var datas = await this.rpc('/render/data/branch');
            $('#main_branch_data').html(datas.branches || '');
            this.trigger_up('widgets_start_request', {$target: $('.main_branch_el_selector')});
        }
});


export const BranchSelector = publicWidget.Widget.extend({
    selector: '.main_branch_el_selector',
        events: {
            'click .create_branch': '_onClickCreate',
            'click .edit_branch': '_onClickEdit',
            'click .delete_branch': '_onClickDelete',
            'click .save_branch': '_onClickSave'
        },
        init: function() {
            this._super.apply(this, arguments);
            this.rpc = this.bindService("rpc");
        },
        start: function() {
            var def = this._super.apply(this, arguments);
            return def;
        },
        branch_render: async function(){
        	var datas = await this.rpc('/render/branch');
        	this.$el.find('.branch_list_cl').html(datas.branches || '');
        },
        _onClickDelete: async function(ev){
        	var branch_id  = parseInt($(ev.currentTarget).attr('branch_id'), 10);
        	if(branch_id){
        		var datas = await this.rpc('/branch/delete', {
        			brnach_id: branch_id,
        		});
        		if(datas){
        			await this.branch_render();
        		}
        	}
        },
        _onClickCreate:  async function(ev){
        	var value = this.$el.find("input[name='create_branch']").val();
        	if(value){
        		var datas = await this.rpc('/branch/create', {
        			value: value
        		});
        		if(datas){
        			await this.branch_render();
        		}
        	}
        },
        _onClickEdit:  async function(ev){
        	var branch_id  = parseInt($(ev.currentTarget).attr('branch_id'), 10);
        	if(branch_id){
        		var datas = await this.rpc('/branch/edit', {
        			brnach_id: branch_id,
        		});
        		if(datas && datas.editform != undefined){
        			$(ev.currentTarget).closest('li').replaceWith(datas.editform);
        		}
        	}

        },
        _onClickSave:  async function(ev){
        	var branch_id  = parseInt($(ev.currentTarget).attr('branch_id'), 10);
        	var edit_value = $(ev.currentTarget).closest('li').find('input').val();
        	if(branch_id){
        		var datas = await this.rpc('/branch/save', {
        			brnach_id: branch_id,
        			value: edit_value
        		});
        		if(datas){
        			await this.branch_render();
        		}
        	}
        },

});
publicWidget.registry.RenderButton = RenderButton;
publicWidget.registry.BranchSelector = BranchSelector;

export default {
    BranchSelector: publicWidget.registry.BranchSelector,
};