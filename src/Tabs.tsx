import * as React from "react";

interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}

interface IState {
  activeName: string;
  activeContent: React.ReactNode;
}

interface ITabProps {
  name: string;
  initialActive?: boolean;
  heading: () => string | JSX.Element;
}

class Tabs extends React.Component<{}, IState> {
  static TabsContext = React.createContext<ITabsContext>({});

  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({ activeName: name, activeContent: content });
  };

  public render() {
    return (
      <Tabs.TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </Tabs.TabsContext.Provider>
    );
  }

  public static Tab: React.SFC<ITabProps> = props => (
    <Tabs.TabsContext.Consumer>
      {(context: ITabsContext) => {
if (!context.activeName && props.initialActive) {
    if (context.handleTabClick) {
     context.handleTabClick(props.name, props.children);
     return null;
    }
   }          
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };
        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.heading()}
          </li>
        );
      }}
    </Tabs.TabsContext.Consumer>
  );
}

export default Tabs;
