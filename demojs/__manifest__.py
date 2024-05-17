# -*- coding: utf-8 -*-
# Part of Kanak infosystems LLP. See LICENSE file for full copyright and licensing details.

{
    'name': 'Frontend JS',
    'category': 'Website/Website',
    'sequence': 50,
    'summary': 'Enter, edit, delete and display records without reload page',
    'website': 'https://www.kanakinfosystems.com/',
    'version': '1.1',
    'depends': ['website'],
    'data': [
        'security/ir.model.access.csv',
        'data/data.xml',
        'views/view.xml',
        'views/template.xml',
    ],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_frontend': [
            "demojs/static/src/js/custom.js"
        ],
    },
    'license': 'OPL-1',
}
