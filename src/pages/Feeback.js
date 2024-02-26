const Feedback = () => {
    const formURL = 'https://forms.gle/vYjZEneDkLugdALd6';
    return (
        // Container with a subtle background color and full-screen height, flex items centered
        <div className="flex justify-center items-center h-screen bg-black">
            <iframe
                className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5 h-3/4 shadow-lg rounded-lg overflow-hidden"
                src={formURL}
                style={{ maxHeight: '500px' }} // Limiting the max height
                title="Feedback Form"
            >
                Loading…
            </iframe>
        </div>
    );
};

export default Feedback;
