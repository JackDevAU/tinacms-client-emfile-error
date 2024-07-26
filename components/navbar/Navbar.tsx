import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
	Transition,
} from "@headlessui/react";
import {
	ArrowTopRightOnSquareIcon,
	ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import AdminLink from "./AdminLink";
import LangButton from "./LangButton";

export default function Navbar(props: {
	navItems: NavItem[];
	tinaProps: NavbarProps;
}) {
	const { navItems, tinaProps } = props;

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ");
	}

	const getAdminUrl = () => `/admin/index.html#/~${window?.location.pathname}`;

	const { data } = useTina({
		query: props.tinaProps.query,
		variables: props.tinaProps.variables,
		data: props.tinaProps.data,
	});

	const cta = data.navbar.cta;

	const items = data.navbar.top_level_items;

	const { locale } = useRouter();
	const router = useRouter();
	const { asPath } = router;

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header
			style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
			className="bg-white border-b-2 border-special-green sticky top-0 z-20"
		>
			<nav
				className="mx-auto flex items-center justify-between p-3 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Link className="-m-1.5 p-1.5" href={locale === "en" ? "/en" : "/"}>
						<span className="sr-only"></span>
						<img
							data-tina-field={tinaField(data.navbar, "logo")}
							className="h-12 w-auto"
							src={data.navbar.logo || ""}
							alt="logo"
						/>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<PopoverGroup className="hidden lg:flex lg:gap-x-12">
					{items.map((item, i) => {
						switch (item.__typename) {
							case "NavbarTop_level_itemsSubmenu":
								if (item.items == null) {
									return null;
								}
								return (
									<Popover
										key={encodeURIComponent(item.text)}
										className="relative"
									>
										{({ open, close }) => (
											<>
												<PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
													{locale === "en" ? item.text_en : item.text}
													<ChevronDownIcon
														className="h-5 w-5 flex-none text-gray-400"
														aria-hidden="true"
													/>
												</PopoverButton>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-200"
													enterFrom="opacity-0 translate-y-1"
													enterTo="opacity-100 translate-y-0"
													leave="transition ease-in duration-150"
													leaveFrom="opacity-100 translate-y-0"
													leaveTo="opacity-0 translate-y-1"
												>
													<PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
														{item.items
															? item.items.map((child, i) => {
																	switch (child.__typename) {
																		case "NavbarTop_level_itemsSubmenuItemsLink":
																			if (
																				child.link == null ||
																				child.external_link_text_en == null ||
																				child.external_link_text == null
																			) {
																				return null;
																			}
																			return (
																				<a
																					key={i}
																					href={child.link}
																					target="_blank"
																					rel="noopener noreferrer"
																					className={classNames(
																						"block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100",
																					)}
																					onClick={() => close()}
																				>
																					<span className="flex items-center gap-1">
																						{locale === "en"
																							? child.external_link_text_en
																							: child.external_link_text}
																						<ArrowTopRightOnSquareIcon className="h-4" />
																					</span>
																				</a>
																			);
																		case "NavbarTop_level_itemsSubmenuItemsPagelink":
																			if (child.page == null) {
																				return null;
																			}
																			return (
																				<Link
																					key={i}
																					href={child.page._sys.breadcrumbs.join(
																						"/",
																					)}
																					className={classNames(
																						asPath ===
																							"/" +
																								child.page._sys.breadcrumbs.join(
																									"/",
																								)
																							? "bg-gray-100"
																							: "",
																						"block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100",
																					)}
																					onClick={() => close()}
																				>
																					{locale === "en"
																						? child.page.titleEnglish
																						: child.page.title}
																				</Link>
																			);
																	}
																})
															: null}
													</PopoverPanel>
												</Transition>
											</>
										)}
									</Popover>
								);
							case "NavbarTop_level_itemsLink":
								if (
									item.link == null ||
									item.external_link_text == null ||
									item.external_link_text_en == null
								) {
									return null;
								}
								return (
									<a
										key={i}
										href={item.link}
										target="_blank"
										rel="noopener noreferrer"
										className={classNames(
											"leading-6 flex items-center text-sm font-semibold gap-1",
										)}
									>
										{locale === "en"
											? item.external_link_text_en
											: item.external_link_text}{" "}
										<ArrowTopRightOnSquareIcon className="h-4" />
									</a>
								);
							case "NavbarTop_level_itemsPagelink":
								if (item.page == null) {
									return null;
								}
								return (
									<Link
										key={i}
										href={item.page._sys.breadcrumbs.join("/")}
										className={classNames("text-sm font-semibold leading-6")}
										onClick={() => close()}
									>
										{locale === "en" ? item.page.titleEnglish : item.page.title}
									</Link>
								);
						}
					})}
				</PopoverGroup>

				<div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-8">
					{/* <SearchInput></SearchInput> */}
					{cta?.link && cta.text ? (
						<a
							className="bg-special-green hover:bg-green-700 text-white font-semibold py-2 px-5 rounded"
							href={cta.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							{locale === "en" ? cta.text_en : cta.text}
						</a>
					) : null}

					<LangButton />
					{/* <AdminLink /> */}
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link className="-m-1.5 p-1.5" href={locale === "en" ? "/en" : "/"}>
							<span className="sr-only"></span>
							<img
								data-tina-field={tinaField(data.navbar, "logo")}
								className="h-8 w-auto"
								src={data.navbar.logo || ""}
								alt="logo"
							/>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navItems.map((item) =>
									item.children && item.children.length > 0 ? (
										<Disclosure as="div" className="-mx-3" key={item.order}>
											{({ open }) => (
												<>
													<DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100">
														{locale === "en" ? item.titleEnglish : item.title}
														<ChevronDownIcon
															className={classNames(
																open ? "rotate-180" : "",
																"h-5 w-5 flex-none",
															)}
															aria-hidden="true"
														/>
													</DisclosureButton>
													<DisclosurePanel className="mt-2 space-y-2">
														{item.children
															? item.children.map((child) => (
																	<DisclosureButton
																		key={child.title}
																		as="a"
																		href={"/" + child.path.join("/")}
																		className={classNames(
																			asPath === "/" + child.path.join("/")
																				? "bg-gray-100"
																				: "",
																			"block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-100",
																		)}
																	>
																		{locale === "en"
																			? child.titleEnglish
																			: child.title}
																	</DisclosureButton>
																))
															: null}
													</DisclosurePanel>
												</>
											)}
										</Disclosure>
									) : (
										<Link
											key={item.title}
											href={"/" + item.path.join("/")}
											className={classNames(
												"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100",
											)}
										>
											{locale === "en" ? item.titleEnglish : item.title}
										</Link>
									),
								)}
							</div>
							<div className="py-6 flex gap-6 flex-col">
								<LangButton />
								{/* <AdminLink /> */}
								{cta && cta.link && cta.text ? (
									<a
										className="bg-special-green hover:bg-green-700 text-white font-semibold py-2 px-5 rounded flex justify-center"
										href={cta.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										{locale === "en" ? cta.text_en : cta.text}
									</a>
								) : null}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
}
