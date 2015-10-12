###mocked.js 自定义修改（zodiac custom）
                
1. 修改了header的匹配规则 使其支持macdown header 写法

    //heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
    heading: /^(#{1,6})([^\n]+?) *#* *(?:\n+|$)/ 

2. 代码code显示时清除了末尾的所有换行符

    case 'code': {
                //zodiac custom
                // this.token.text
                //to
                //this.token.text.replace(/[\n]*$/g,"")
                return this.renderer.code(this.token.text.replace(/[\n]*$/g,""),
                    this.token.lang,
                    this.token.escaped);
            }

3. table默认不显示空白项 修改为显示

    for (j = 0; j < row.length; j++) {
                        cell += this.renderer.tablecell(
                            this.inline.output(row[j]),
                            { header: false, align: this.token.align[j] }
                        );
                    }
                    
to
                    
    for (j = 0; j < this.token.header.length; j++) {
                            cell += this.renderer.tablecell(
                                this.inline.output(row[j]||""),
                                { header: false, align: this.token.align[j] }
                            );
                        }