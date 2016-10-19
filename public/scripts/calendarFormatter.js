var supportFormat = [
    {
        'pattern': '',
        'description': ' -- 样式不断添加中 -- '
    },
    {
        'pattern': 'YYYY-MM-DD HH:MM:SS',
        'description': 'YYYY-MM-DD HH:MM:SS'
    },
    {
        'pattern': 'YYYY年M月D日 hr时mi分se秒',
        'description': 'YYYY年M月D日 hr时mi分se秒'
    }
];


/*
 * Set datetime format as the pattern specified
 * @param {string} dateString 有效的JS日期字符串
 * @param {string} pattern 支持的输出格式
 * @returns {string}
 */
function formatDatetime(dateString, pattern) {
    var a = new Date(dateString), b ='',
        year = a.getFullYear(), month = a.getMonth()+1, day = a.getDate(),
        time = a.toTimeString().split(' ')[0].split(':'),
          hr = time[0], mi = time[1], se = time[2];

    if (isNaN(year)||isNaN(month)||isNaN(day)||time[0]=='Invalid') {
        b = '输入的日期无法识别呢-.-'
    } else {
        switch (pattern) {
            case 'YYYY-MM-DD HH:MM:SS':
                b = year +'-'+ month +'-'+ day +' '+ hr +':'+ mi +':'+ se;
                break;
            case 'YYYY年M月D日 hr时mi分se秒':
                b = year +'年'+ month +'月'+ day +'日'+' '+ hr +'时'+ mi +'分'+ se +'秒';
                break;
            default:
                break;
        }
    }

    return b;
}


const DatetimeFormatterResult = (props) => (
    <div className="result">这是你想要的日期样式嘛？？<br/>
        <span>{props.data}</span>
    </div>
)


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
                    <label>这里填日期时间：</label>
                    <input
                      type="text"
                      placeholder="请输入JS可识别的日期字符串~"
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
                <button type="submit">转换格式~</button>
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

    handleInputChange(data) {
        this.setState({ result: this.props.formatDatetime(data.datetime, data.format) })
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
  formatList: supportFormat,
  formatDatetime: formatDatetime
};

ReactDOM.render(
  <DatetimeFormatter />,
  document.getElementById('content')
)
