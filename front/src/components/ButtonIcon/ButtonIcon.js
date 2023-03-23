import React from "react";
import './index.css'


export function UserButton() {
	return (
		<button class = 'user-button'>
			<i class="bi bi-person"></i>
		</button>
    )
}

export function AddButton() {
	return (
		<button class = 'add-button'>
			<i class="bi bi-plus"></i>
		</button>
    )
}

export function CalendarButton() {
	return (
		<button class = 'calendar-button'>
			<i class="bi bi-calendar2"></i>
		</button>
    )
}

export function SortButton() {
	return (
		<button class = 'sort-button'>
			<i class="bi bi-arrow-down-up"></i>
			sort
		</button>
    )
}

export function FilterButton() {
	return (
		<button class = 'filter-button'>
			<i class="bi bi-filter"></i>
			filter
		</button>
    )
}

export function SortDescButton() {
	return (
		<button class = 'sort-desc-button'>
			<i class="bi bi-sort-down"></i>
		</button>
    )
}

export function SortAscButton() {
	return (
		<button class = 'sort-asc-button'>
			<i class="bi bi-sort-down-alt"></i>
		</button>
    )
}

export function EditListButton() {
	return (
		<button class = 'edit-list-button'>
			<i class="bi bi-pencil"></i>
		</button>
    )
}

export function NotificationButton() {
	return (
		<button class = 'notification-button'>
			<i class="bi bi-bell"></i>
		</button>
    )
}