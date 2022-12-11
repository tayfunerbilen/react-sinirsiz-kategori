import { useMemo, useState } from "react";
import CategorySelect from "./category-select";

function App() {

	const [parent, setParent] = useState(0)
	const [categoryName, setCategoryName] = useState()
	const [categories, setCategories] = useState([
		{
			"id": 1,
			"name": "A",
			"parent": 0
		},
		{
			"id": 2,
			"name": "B",
			"parent": 0
		},
		{
			"id": 3,
			"name": "C",
			"parent": 0
		},
		{
			"id": 4,
			"name": "B-1",
			"parent": 2
		},
		{
			"id": 5,
			"name": "B-2",
			"parent": 2
		},
		{
			"id": 6,
			"name": "B-3",
			"parent": 2
		},
		{
			"id": 7,
			"name": "B-2-1",
			"parent": 5
		},
		{
			"id": 8,
			"name": "B-2-2",
			"parent": 5
		},
		{
			"id": 9,
			"name": "B-2-2 sub-1",
			"parent": 8
		},
		{
			"id": 10,
			"name": "B-2-2 sub-1 / 2",
			"parent": 9
		}
	])

	const filteredCategories = useMemo(() => categories.filter(category => category.parent === parent), [parent, categories])

	const findCategories = (parent) => {
		if (parent === 0) {
			return []
		}
		const category = categories.find(c => c.id === parent)
		if (category) {
			return [
				category,
				category.parent !== 0 && findCategories(category.parent)
			]
		}
	}
	const getBreadcrumb = parent => {
		return findCategories(parent).flat(Infinity).filter(Boolean).reverse()
	}
	// console.log(getBreadcrumb(9))

	const breadcrumb = useMemo(() => getBreadcrumb(parent), [parent])

	const submitHandle = e => {
		e.preventDefault()
		setCategories([
			...categories,
			{
				id: categories.length + 1,
				name: categoryName,
				parent
			}
		])
		setCategoryName('')
	}


	const findSubCategories = (parent, combin) => { //!recrsively
		const childs = categories.filter(c => c.parent == parent);
		combin.push(childs);
		if (childs.length == 0) {
			return;
		}
		childs.forEach(child => findSubCategories(child.id, combin))
	}

	const deleteCategory = id => {
		const targetCategory = categories.find(c => c.id == id);

		const combin = [targetCategory];

		findSubCategories(id, combin); //!find subs recursiveliy

		const findedSubCategories = (combin.flat(Infinity))
		console.log('findedSubCategories:', findedSubCategories)
		const newCategoriesData = categories.filter(category => findedSubCategories.every(child => child !== category))
		setCategories(newCategoriesData);
	}
	console.log('categories', categories)

	const subCategoryHandle = category => {
		setParent(category.id)
	}

	const getSubCategoryCount = id => {
		return categories && categories.filter(c => c.parent === id).length || 0
	}

	return (
		<div className="container mx-auto py-4">
			<form className="flex gap-x-4 mb-4" onSubmit={submitHandle}>
				<input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)}
					className="border flex-1 border-gray-300 outline-none focus:border-indigo-600 h-10 px-4 rounded-md text-sm"
					placeholder="Kategori Adı" />
				<button disabled={!categoryName} type="submit"
					className="h-10 bg-indigo-600 text-white text-sm px-4 rounded-md disabled:opacity-50 disabled:pointerevents-none">Ekle
				</button>
			</form>
			{breadcrumb.length > 0 && (
				<nav className="bg-yellow-50 border border-yellow-600 flex items-center gap-x-4 text-sm">
					{breadcrumb.map(c => (
						<button onClick={() => setParent(c.parent)}>{c.name}</button>
					))}
				</nav>
			)}
			<div className="grid gap-y-4">
				{filteredCategories.map(category => (
					<div key={category.id}
						className="bg-zinc-100 border border-zinc-400 p-4 rounded-md text-sm flex items-center justify-between">
						{category.name}
						<nav className="flex items-center gap-x-2">
							<button
								onClick={() => subCategoryHandle(category)}
								className="h-7 px-4 rounded bg-indigo-600 text-white">
								Alt Kategoriler
								({getSubCategoryCount(category.id)})
							</button>
							<button onClick={() => deleteCategory(category.id)}
								className="h-7 px-4 rounded bg-red-600 text-white">Sil
							</button>
						</nav>
					</div>
				))}
			</div>
			<CategorySelect categories={categories} />
		</div>
	);
}

export default App;
