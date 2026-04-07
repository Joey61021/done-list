import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutePaths from '../../util/RoutePaths';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const ROUTES = [
        {title: "Home", route: RoutePaths.HOME}
    ];

    return (
        <header className="px-20 h-[var(--header-height)] flex justify-between items-center">
            <p onClick={() => navigate(RoutePaths.HOME)} className="text-2xl font-bold text-[var(--text)] cursor-pointer"><span className="text-[var(--primary)]">{'<'}</span>done-list<span className="text-[var(--primary)]">{'/>'}</span></p>

            <div className="flex gap-8">
                {ROUTES.map((route, index) => {
                    return (
                        <div key={index} onClick={() => navigate(route.route)}>
                            <p className="text-lg text-[var(--text)] cursor-pointer hover:underline">{route.title}</p>
                        </div>
                    )
                })}
            </div>

            {/* <Button text="Login" action={() => navigate(RoutePaths.LOGIN)}/> */}
        </header>
    );
}
