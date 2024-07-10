// Define a custom map method for arrays to generate HTML elements

const container = document.querySelector('.container');

Array.prototype.mapToHTMLElements = function(callback) {
    // Use Array.prototype.map to generate HTML elements for each item
    return this.map(item => {
      // Call the callback function to get the HTML element for each item
      return callback(item);
    });
  };
  
  // Example usage:
  const data = [
    {
        id: 1,
        text: `category 1`,
        icon: 'fa-solid fa-folder'
    },
    {
        id: 2,
        text: `category 2`,
        icon: 'fa-solid fa-folder'
    },
    {
        id: 3,
        text: `category 2`,
        icon: 'fa-solid fa-folder'
    },
    {
        id: 4,
        text: `category 2`,
        icon: 'fa-solid fa-folder'
    },
    {
        id: 5,
        text: `category 2`,
        icon: 'fa-solid fa-folder'
    },
    {
        id: 6,
        text: `category 2`,
        icon: 'fa-solid fa-folder'
    },
    {
        id: 7,
        text: `category 2`,
        icon: 'fa-solid fa-folder'
    },
];
  
  // Function to create an HTML element for each item
 /* function createHTMLElement(item) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.textContent = `${item.id}: ${item.text}`;
    p.textContent = `element-${item.id}`;
    div.appendChild(p);

    return div;
  }
  
  // Use the custom mapToHTMLElements method to generate HTML elements for each item
  const elements = data.mapToHTMLElements(createHTMLElement);
  
  // Example: Append the created HTML elements to the document body
  elements.forEach(element => container.appendChild(element));*/

  
