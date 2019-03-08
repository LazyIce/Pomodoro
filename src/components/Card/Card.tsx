import * as React from "react";

interface Props {
    plain?: boolean,
    hCenter?: boolean,
    title?: string,
    category?: string,
    ctAllIcons?: boolean,
    ctTableFullWidth?: boolean,
    ctTableResponsive?: boolean,
    ctTableUpgrade?: boolean,
    content: any,
    legend?: string,
    stats?: string,
    statsIcon?: string
}
interface State {}

class Card extends React.Component<Props, State> {
    render() {
        return (
            <div className={"card" + this.props.plain ? "card-plain" : ""}>
                <div className={"header" + this.props.hCenter ? "text-center" : ""}>
                    <h4 className="title">{this.props.title}</h4>
                    <p className="category">{this.props.category}</p>
                </div>
                <div className={
                    "content" + 
                    (this.props.ctAllIcons ? "all-icons" : "") +
                    (this.props.ctTableFullWidth ? "table-full-width" : "") +
                    (this.props.ctTableResponsive ? "table-responsive" : "") +
                    (this.props.ctTableUpgrade ? "table-upgrade" : "") 
                }>
                    {this.props.content}
                    <div className="footer">
                        {this.props.legend}
                        {this.props.stats != null ? <hr /> : ""}
                        <div className="stats">
                            <i className={this.props.statsIcon} /> {this.props.stats}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;