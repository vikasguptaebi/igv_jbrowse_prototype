const fetchIndexData = async () => {
    try {
        const response = await fetch('/data/indexData.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching index data:', error);
        return [];
    }
};

export default fetchIndexData;
