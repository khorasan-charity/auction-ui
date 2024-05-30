export type DropProps = {
  size: number;
  left: any;
  top: any;
};

export function Drop(props: DropProps) {
  return (
    <div className="drop" style={{width: props.size, height: props.size, left: props.left, top: props.top}}>
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" strokeWidth={1}>
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="red"/>
</svg>
    </div>
  );
}
