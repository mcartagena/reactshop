import * as React from "react";

interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string) => void;
}

interface IState {
  activeName: string;
}

interface ITabProps {
  name: string;
  initialActive?: boolean;
}

class Tabs extends React.Component<{}, IState> {
  static TabsContext = React.createContext<ITabsContext>({});

  private handleTabClick = (name: string) => {
    this.setState({ activeName: name });
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
      </Tabs.TabsContext.Provider>
    );
  }
  public static Tab: React.SFC<ITabProps> = props => (
    <Tabs.TabsContext.Consumer>
      {(context: ITabsContext) => {
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name);
          }
        };
        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.children}
          </li>
        );
      }}
    </Tabs.TabsContext.Consumer>
  );
}

export default Tabs;
