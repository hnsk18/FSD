# College Event Management System

A responsive website for managing college events where students can view upcoming events, register for events, and view event schedules.

## Project Description

This is a comprehensive event management platform developed for college students to discover, register, and participate in various college events including technical competitions, cultural festivals, and other activities.

## Features

### 1. **Home Page** (`index.html`)

- Responsive navbar with navigation links
- Interactive carousel with hero section
- Event highlights section
- Featured events preview
- Call to action section
- Footer with links and social media

### 2. **Events Page** (`events.html`)

- Display 6 different events using cards
- Event cards include:
  - Event image (placeholder with icons)
  - Event name
  - Date and venue information
  - Team size requirements
  - Register button
- Filter functionality (Technical/Cultural events)
- Responsive grid layout

### 3. **Event Registration** (`registration.html`)

- Comprehensive registration form with fields:
  - Student Name
  - Roll Number
  - Branch (dropdown selection)
  - Email Address
  - Mobile Number
  - Event Selection (multiple events)
- Form validation
- Success/Error messages
- Confirmation display

### 4. **Event Schedule** (`schedule.html`)

- Responsive table layout with Bootstrap table classes:
  - table-striped
  - table-hover
  - table-bordered
- Displays event timings, dates, venues
- Monthly view (March and April)
- Important notes section
- Badge indicators for event types

### 5. **Gallery** (`gallery.html`)

- Responsive image grid using Bootstrap grid
- 9+ event photographs
- Category filtering (Technical/Cultural/General)
- Card-based layout for images
- Modal for viewing full images
- Image descriptions

### 6. **FAQ Page** (`faq.html`)

- Bootstrap accordion component
- 10 comprehensive questions covering:
  - Registration process
  - Registration fees
  - Multiple event participation
  - Event schedules and venues
  - Required documents
  - Prize information
  - Team formation
  - Registration modifications
  - Organizer contact
- Easy to expand and modify

### 7. **Contact Page** (`contact.html`)

- Contact information section
- Event coordinators details
- Comprehensive contact form with:
  - Name, Email, Phone fields
  - Subject dropdown
  - Message textarea
  - Terms & conditions checkbox
- Form validation and success messages
- Social media links
- Embedded map
- Contact details (address, phone, email, hours)

## Bootstrap Components Used

✓ Navbar
✓ Carousel
✓ Cards
✓ Forms & Input Groups
✓ Tables (Striped, Hover)
✓ Accordion
✓ Alerts
✓ Buttons
✓ Grid System
✓ Modals
✓ Badges
✓ Responsive Design

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with variables and animations
- **Bootstrap 5.3**: Responsive framework
- **JavaScript**: Form handling, validation, and interactivity
- **Font Awesome**: Icons for enhanced UI

## File Structure

```
3.CollegeEvent/
├── index.html           # Home page
├── events.html          # Events listing
├── registration.html    # Event registration form
├── schedule.html        # Event schedule table
├── gallery.html         # Event gallery
├── faq.html            # FAQ accordion
├── contact.html        # Contact form
├── styles.css          # Custom CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## CSS Features

- Custom color scheme with CSS variables
- Smooth transitions and hover effects
- Responsive breakpoints for mobile, tablet, and desktop
- Custom scrollbar styling
- Loading animations
- Print-friendly styles

## JavaScript Functionality

1. **Form Validation**
   - Email format validation
   - Phone number validation
   - Required field checking

2. **Event Filtering**
   - Filter events by category
   - Dynamic display/hide functionality

3. **Gallery Filtering**
   - Filter images by category
   - Smooth transitions

4. **Modal Management**
   - Image preview in modals
   - Dynamic content loading

5. **Active Navigation**
   - Highlights current page in navbar

## How to Use

1. Open `index.html` in a web browser
2. Navigate using the navbar menu
3. Explore different events on the Events page
4. Register for events using the Registration page
5. View event schedule and timings
6. Check gallery for past event photos
7. Read FAQ for common questions
8. Contact organizers using the contact form

## Responsive Design

The website is fully responsive and works on:

- Desktop (1920px and above)
- Tablets (768px - 1024px)
- Mobile devices (320px - 768px)

## Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Future Enhancements

- Backend integration for database storage
- User authentication and login
- Payment gateway for paid events
- Email notifications
- Event search functionality
- User dashboard for registered events
- Admin panel for event management

## Notes for Development

- All form data is currently validated client-side
- Images are placeholder divs with icons (can be replaced with actual images)
- Map is a placeholder embed (can be customized)
- Consider adding backend database for persistent storage
- Add server-side form validation for security

## Testing

Test the following:

- Form validation with various inputs
- Navigation between pages
- Responsive design on different screen sizes
- Filter functionality
- Modal opening and closing
- Accordion expand/collapse

## Created By

College Event Management Team

## License

This project is for educational purposes.

---

**Last Updated**: March 2024
