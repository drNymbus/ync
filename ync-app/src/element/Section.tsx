function Section({ image, name }) {
    return (
        <div className="section">
            <img className="section image" src={image} />
            <p className="section title">{name}</p>
        </div>
    );
} export default Section;