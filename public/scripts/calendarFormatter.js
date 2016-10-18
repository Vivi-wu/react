var supportFormat = [
    {
        'pattern': '',
        'description': ' -- 样式不断添加中 -- '
    },
    {
        'pattern': 'YYYY-MM-DD HH:MM:SS',
        'description': 'YYYY-MM-DD HH:MM:SS',
        'func': function(data) {
            return format1(data)
        }
    }
];

/*
 * Set datetime format as "YYYY-MM-DD HH:MM:SS"
 * @param data 有效的JS日期字符串
 * @returns {string}
 */
function format1(data) {
    var a = new Date(data), b = '', c = '', d = '';
    b = a.toLocaleDateString()
    c = a.toTimeString()
    d = b.replace(/\//g, '-') + ' ' + c.split(' ')[0]

    return d;
}


class DatetimeFormatterResult extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="result">这是你想要的日期样式嘛？？<br/>
                <span>{this.props.data}</span>
            </div>
        )
    }
}

class DatetimeFormatterInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = { datetime: '', format: '' }
        this.handleDateInputChange = this.handleDateInputChange.bind(this)
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleDateInputChange(e) {
        this.setState({datetime: e.target.value})
    }

    handleFormatChange(e) {
        this.setState({format: e.target.value})
    }

    handleSubmit(e) {
        var datetime = this.state.datetime.trim(),
              format = this.state.format.trim();
        e.preventDefault();
        if (!datetime || !format) { return }
        this.props.onFormatterSubmit({datetime: datetime, format: format})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <label>这里填日期：</label>
                    <input
                      type="text"
                      placeholder="请输入JS可识别的日期字符串哟~"
                      value={this.state.datetime}
                      onChange={this.handleDateInputChange}
                    />
                </div>
                <div className="input-group">
                    <label>这里选择输出样式：</label>
                    <select value={this.state.format} onChange={this.handleFormatChange}>
                        {this.props.data.map((item, index) => (
                            <option key={index} value={item.pattern}>{item.description}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">见证奇迹~</button>
            </form>
        )
    }
}

class DatetimeFormatter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { result: '' }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    convertDatatimeFormat(dateString, format) {
        var i = 0, j = supportFormat.length;
        for (i; i < j; i++) {
            if (supportFormat[i].pattern) {
                if (new RegExp(supportFormat[i].pattern, 'i').test(format)) {
                    return supportFormat[i].func(dateString)
                }
            } else {
                continue
            }
        }
        console.log('Oops! The format is out of our capacity.')
    }

    handleInputChange(data) {
        this.setState({ result: this.convertDatatimeFormat(data.datetime, data.format) })
    }

    render() {
        return (
            <div>
                <h2>按指定格式输出日期时间~</h2>
                <DatetimeFormatterResult data={this.state.result} />
                <DatetimeFormatterInput  onFormatterSubmit={this.handleInputChange} data={this.props.formatList} />
            </div>
        )
    }
}

// Specifies the default values for Root component's props
DatetimeFormatter.defaultProps = {
  formatList: supportFormat
};

ReactDOM.render(
  <DatetimeFormatter />,
  document.getElementById('content')
)
