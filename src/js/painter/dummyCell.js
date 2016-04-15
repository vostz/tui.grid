/**
 * @fileoverview Dummy cell painter
 * @author NHN Ent. FE Development Team
 */
'use strict';

var Painter = require('../base/painter');
var util = require('../common/util');
var attrNameMap = require('../common/constMap').attrName;

/**
 * Dummy Cell Painter
 * @module painter/dummyCell
 * @extends module:base/painter
 */
var DummyCell = tui.util.defineClass(Painter, /**@lends module:painter/dummyCell.prototype */{
    /**
     * @constructs
     */
    init: function() {
        Painter.apply(this, arguments);
    },

    /**
     * key-value object contains event names as keys and handler names as values
     * @type {Object}
     */
    events: {
        dblclick: '_onDblClick'
    },

    /**
     * css selector to find its own element(s) from a parent element.
     * @type {String}
     */
    selector: 'td[edit-type=dummy]',

    /**
     * Template function
     * @returns {String} HTML string
     */
    template: _.template(
        '<td <%=columnNameAttrName%>="<%=columnName%>" ' +
            'class="<%=className%>" ' +
            'edit-type="dummy">' +
            '&#8203;' + // 'for height issue with empty cell in IE7
        '</td>'
    ),

    /**
     * Event handler for 'dblclick' event
     * @private
     */
    _onDblClick: function() {
        this.controller.appendEmptyRowAndFocus(true);
    },

    /**
     * Generates a HTML string from given data, and returns it.
     * @param {String} columnName - column name
     * @returns {string} HTML string
     * @implements {module:base/painter}
     */
    generateHtml: function(columnName) {
        var isMeta = util.isMetaColumn(columnName);

        return this.template({
            columnNameAttrName: attrNameMap.COLUMN_NAME,
            columnName: columnName,
            className: (isMeta ? 'meta_column ' : '') + 'dummy'
        });
    }
});

module.exports = DummyCell;
