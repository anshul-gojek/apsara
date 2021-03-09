import { Button as AntButton } from "antd";
import { NativeButtonProps } from "antd/lib/button/button";
import { TooltipPlacement } from "antd/lib/tooltip";
import * as React from "react";
import clsx from "clsx";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import Icon from "../Icon";
import "./style.less";
import Tooltip from "../Tooltip";

const Button: React.FC<NativeButtonProps> = styled(AntButton)`
    // custom-props
`;

interface CustomButtonProps {
    className?: string;
    tooltipMessage?: React.ReactNode;
    tooltipPlacement?: TooltipPlacement;
    type?: "link" | "text" | "default" | "primary" | "ghost" | "dashed" | "barebone";
    styleOverride?: Record<string, string>;
    loading?: boolean;
    disabled?: boolean;
    iconName?: string;
    iconSize?: number;
    children?: React.ReactNode;
}

function CustomButton({
    className = "",
    tooltipMessage = "",
    tooltipPlacement = "bottom",
    type = "default",
    styleOverride = {},
    loading = false,
    disabled = false,
    iconName,
    iconSize = 24,
    children,
    ...props
}: Omit<NativeButtonProps, "type"> & CustomButtonProps) {
    const IconComponent = () => {
        // ? --inline style is expected by antd
        if (loading) {
            // ? need to subtract 6px because antd's icon has no padding while our icon has.
            const loadingIconSize = `calc(${iconSize}px - 6px)`;
            return (
                <LoadingOutlined style={{ fontSize: loadingIconSize, height: loadingIconSize, marginRight: "2px" }} />
            );
        }
        return iconName ? (
            <Icon size={iconSize} name={iconName} styleOverride={styleOverride} active={!disabled} />
        ) : null;
    };

    const button =
        type === "barebone" ? (
            <Button disabled={disabled} className={clsx("skeleton-btn", className, type)} {...props}>
                <IconComponent />
                {children}
            </Button>
        ) : (
            <Button disabled={disabled} className={className} type={type} {...props}>
                <IconComponent />
                {children}
            </Button>
        );

    return tooltipMessage ? (
        <Tooltip placement={tooltipPlacement} title={tooltipMessage}>
            <span>{button}</span>
        </Tooltip>
    ) : (
        button
    );
}

export default CustomButton;