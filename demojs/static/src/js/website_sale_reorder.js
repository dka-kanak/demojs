/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { ReorderDialog } from "@website_sale/js/website_sale_reorder";
import { patch } from "@web/core/utils/patch";

patch(ReorderDialog.prototype, {
	async confirmReorder(ev) {
		console.log("====hello");
		await super.confirmReorder(ev);
	}
});