import React from "react";

type TProps = {
	service: {
		id: number;
	};
};

function Service(props: TProps) {
	return <div>props.service.id</div>;
}

export default Service;
