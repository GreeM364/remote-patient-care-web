import React from "react";
import DropIn from "braintree-web-drop-in-react";

class Payments extends React.Component {
    state = {
        clientToken: 'fake-valid-visa-nonce',
        instance: null,
    };

    async componentDidMount() {
        const { hospitalId } = this.props; // Получаем идентификатор больницы из свойств компонента
        const response = await fetch(`https://localhost:7070/api/Hospital/${hospitalId}/payment`);
        const clientToken = await response.json();

        this.setState({
            clientToken,
        });
    }

    buy = async () => {
        if (this.state.instance) {
            const { nonce } = await this.state.instance.requestPaymentMethod();
            await fetch(`server.test/purchase/${nonce}`);
        }
    };

    render() {
        return (
            <div>
                <DropIn
                    options={{ authorization: this.state.clientToken }}
                    onInstance={(instance) => this.setState({ instance })}
                />
                <button onClick={this.buy}>Buy</button>
            </div>
        );
    }
}

export default Payments;
