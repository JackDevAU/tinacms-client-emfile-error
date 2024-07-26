import Link from "next/link";
import { useRouter } from "next/router";
import { useEditState } from "tinacms/dist/react";
import { useEffect, useState } from "react";

function AdminLink() {
	const [adminUrl, setAdminUrl] = useState("/admin/index.html#/~");
	const router = useRouter();
	const { edit } = useEditState();

	useEffect(() => {
		// This code runs only/should only run on the client side
		const updateAdminUrl = () => {
			setAdminUrl(`/admin/index.html#/~${window.location.pathname}`);
		};

		updateAdminUrl();

		router.events.on("routeChangeComplete", updateAdminUrl);

		// clean up the on component unmount
		return () => {
			router.events.off("routeChangeComplete", updateAdminUrl);
		};
	}, [router]);

	if (edit) {
		return null;
	}

	// TODO: change button to logout if in tina mode
	return (
		<Link
			locale={false}
			href={adminUrl}
			className="font-semibold leading-6 text-gray-900 flex justify-center"
			title={router.locale === "en" ? "Log in as admin" : "Logga in som admin"}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="w-6 h-6"
			>
				<path
					fillRule="evenodd"
					d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
					clipRule="evenodd"
				/>
			</svg>
		</Link>
	);
}

export default AdminLink;
