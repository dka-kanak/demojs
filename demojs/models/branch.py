from odoo import fields, models


class branch(models.Model):
    _name = 'branch.branch'
    _description = 'Branch'
    _rec_name = "name"

    name = fields.Char(string="Name")