from odoo import http
from odoo.http import request


class WebsiteBranches(http.Controller):
    @http.route('/render/data/branch', type="json", auth="public", methods=['POST'], website=True, csrf=False)
    def rednerdemobranches(self, **post):
        branches = request.env['branch.branch'].search([])
        values = {}
        values['branches'] = request.env['ir.ui.view']._render_template('demojs.main_branch_el_selector', {
            'branches': branches,
        })
        return values

    @http.route('/branch', type='http', auth="public", website=True, sitemap=False)
    def demobranches(self, **post):
        branches = request.env['branch.branch'].search([])
        return request.render('demojs.branches', {'branches': branches})

    @http.route('/render/branch', type="json", auth="public", methods=['POST'], website=True, csrf=False)
    def renderbranch(self):
        branches = request.env['branch.branch'].search([])
        values = {}
        values['branches'] = request.env['ir.ui.view']._render_template('demojs.branch_tmpl', {
            'branches': branches,
        })
        return values

    @http.route('/branch/delete', type="json", auth="public", methods=['POST'], website=True, csrf=False)
    def deletebranch(self, brnach_id=None):
        if brnach_id:
            branch = request.env['branch.branch'].browse(brnach_id)
            branch.unlink()
            return True
        return False

    @http.route('/branch/create', type="json", auth="public", methods=['POST'], website=True, csrf=False)
    def createbranch(self, value=None):
        if value:
            branch = request.env['branch.branch'].create({
                'name': value
            })
            if branch:
                return True
            else:
                return False
        return False

    @http.route('/branch/save', type="json", auth="public", methods=['POST'], website=True, csrf=False)
    def Savebranch(self, brnach_id=None, value=''):
        if brnach_id:
            branch = request.env['branch.branch'].browse(brnach_id)
            branch.write({'name': value})
            return True
        return False

    @http.route('/branch/edit', type="json", auth="public", methods=['POST'], website=True, csrf=False)
    def Editranch(self, brnach_id=None):
        values = {}
        if brnach_id:
            branch = request.env['branch.branch'].browse(brnach_id)
            values['editform'] = request.env['ir.ui.view']._render_template('demojs.edit_branch', {
                'branch': branch
            })
            return values
        return {}
