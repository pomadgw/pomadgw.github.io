function putToStack(stack, $list) {
    $l = $list.contents();
    for (i = 0; i < $l.length; i++) {
        stack.push($($l[i]));
    }
}

function undefined_(obj) {
    return (typeof obj === "undefined");
}

function replaceWithQuote($dom) {
    var stack = new Array();
    excluded = ['pre', 'code', 'kbd', 'samp', 'var'];

    stack.push($dom);
    
    while (stack.length != 0) {
        $child = stack.pop();
        if (!undefined_($child[0].tagName) && $.inArray($child[0].tagName.toLowerCase(), excluded) != -1) {
            continue;
        }
        var text_obj = $child.contents()
              .filter(function(){
                return this.nodeType == 3;
            }).first()[0];
        if (!undefined_(text_obj)) {
            var text = text_obj.textContent;
            text_obj.textContent = text.replace(/"(.*?)"/, function(match, $i, offset, original) { return "“" + $i + "”"; })
                .replace(/'(.*?)'/, function(match, $i, offset, original) { return "‘" + $i + "’"; })
                .replace(/\.\.\./g, "…");
        }
        putToStack(stack, $child);
    }
}

function addLabel() {
    $('pre[data-title]').each(function(i) {
        $code = $(this).find('code');
        var title = $(this).attr('data-title');
        
        $title_name = title;
        if ($(this).attr('data-download') && $(this).attr('data-download') == 'true') {
            $a = $('<a/>', {
                'download': title,
                'href': '#download=' + title
            });

            $a.click(function(e) {
                e.preventDefault();
                text = $code.text();
                var blob = new Blob([text], {type: "application/octet-stream;charset=utf-8"});
                saveAs(blob, title);
            });
            
            $a.text(title);

            $title_name = $a;
        }

        $pre = $(this)[0].outerHTML;
        $figure = $('<figure/>', {'class': 'figure-code'});
        $figcap = $('<figcaption/>').append($title_name);

        $figure.append($pre);
        $figure.append($figcap);
        $(this).replaceWith($figure);
    });
}

function addLineNumber($code) {
    $code.each(function(i) {
        $code = $(this);
        $parent = $(this).parent();
        data = $code.text();
        line_num = data.split('\n').length;
        // var html_data = $code.html();
        
        $table = $('<table/>', {'class': 'table-code'});
        $tr = $('<tr/>');
        $line_num_col = $('<td/>', {'class': 'line-num'});
        $code_col = $('<td/>', {'class': 'code'});
        // $line_num_col_pre = $('<pre/>');
        // $code_col.html(html_data);
        $code_col.append($code);

        line_content = ''
        for (i = 1; i <= line_num - 1; i++) {
            line_content += i;
            if (i < line_num - 1) {
                line_content += '\n';
            }
        }
        // $line_num_col_pre.text(line_content);
        $line_num_col.text(line_content);
        
        // $line_num_col.append($line_num_col_pre);

        $tr.append($line_num_col);
        $tr.append($code_col);
        $table.append($tr);

        // $code.empty();
        // $code.append($table);

        $parent.empty();
        $parent.append($table);
    });
}

$(document).ready(function(){
    replaceWithQuote($('#main-data'));
    addEventListener('load', function() {
        $('pre code').each(function(i) {
            var code = this;
            var parent_classes = $(code).parent().attr('class').split(/\s+/);
            var langs = self.hljs.listLanguages();

            lang = '';
            for (i = 0; i < parent_classes.length; i++) {
                if (parent_classes[i].match(/(?:lang|language)-.+/)) {
                    lang = parent_classes[i].replace(/^(?:lang|language)-/, '');
                    break;
                } else if ($.inArray(parent_classes[i], langs) != -1) {
                    lang = parent_classes[i];
                    break;
                }
            }

            var worker = new Worker('/js/worker.js');

            worker.onmessage = function(event) {
                code.innerHTML = event.data;
                if ($.inArray('with-line-num', parent_classes) != -1) {
                    addLineNumber($(code));
                }
            }

            worker.postMessage({'lang': lang, 'code': code.textContent});
        });
    });
    addLabel();
});