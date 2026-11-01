export default function TombolAksi ({
    children,
    onClick,
    type = 'button',
    disabled = false,
}) {
    return (
        <button
            type={type}
            className={'tombol-aksi'}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}