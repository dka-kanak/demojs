/** @odoo-module **/
import publicWidget from "@web/legacy/js/public/public_widget";
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

const super_method_apply = publicWidget.registry.WebsiteSaleLayout.prototype._onApplyShopLayoutChange;

debugger;
publicWidget.registry.WebsiteSaleLayout.include({
	before_message_show: async function(){
		const is_ok = await new Promise(resolve => {
			this.call("dialog", "add", ConfirmationDialog, {
				title: 'before',
	            body: 'OK then continue',
                confirm: () => resolve(true),
                cancel: () => resolve(false),
	        });
		});
		return is_ok;
	},
	after_message_show: function(){
		this.call("dialog", "add", AlertDialog, {
            title: 'after show',
            body: 'after show dialog'
        });
	},
	_onApplyShopLayoutChange: function (ev) {
		// var is_ok = await this.before_message_show();
		// if(is_ok){
			// super_method_apply.apply(this, arguments);

			this._super.apply(this, arguments);
			// this.after_message_show();
		// }
	}
});
