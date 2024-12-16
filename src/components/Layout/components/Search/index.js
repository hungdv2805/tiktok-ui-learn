import { useEffect, useState } from 'react';
import {
  faCircleXmark,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    setTimeout(() => {
        setSearchResult([]);
    }, 0);
}, [])
  return ( 
      <HeadlessTippy
        interactive
        visible={searchResult.length > 0}
        render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <h4 className={cx('search-title')}>Accounts</h4>
                    <AccountItem />
                    <AccountItem />
                    <AccountItem />
                    <AccountItem />
                </PopperWrapper>
            </div>
        )}
      >
      <div className={cx('search')}>
          <input placeholder="Search accounts and videos" spellCheck={false} />
          <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

          <button className={cx('search-btn')}>
              <SearchIcon />
          </button>
      </div>
  </HeadlessTippy>
  );
}

export default Search;