import React from 'react';
import { HeaderDefault } from '../../store/ConnectedComponents';

function FAQ() {
	document.title = "Frequently Asked Questions | HabitApp";
	return (
	<>
		<HeaderDefault />
		<div className="faq">
			<div className="faq-item">
				<div className="faq-q">
					What is this app?
				</div>
				<div className="faq-a">
					<p>If you're seeing this page, it means you're a <em>very</em> early adopter. So, thanks! But that also means I haven't had many questions asked. So if you have one, please ask.</p>
				</div>
				<div className="faq-q">
					What is that number to the right on my habit?
				</div>
				<div className="faq-a">
					<p>That is your momentum. Every time you complete a habit, your scores goes up 1. If you miss your habit for the day (week, month, etc) it will go down 1.</p>
				</div>
			</div>
		</div>
	</>
	)
};

export default FAQ;